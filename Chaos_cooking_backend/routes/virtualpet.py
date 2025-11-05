# Backend code logic for gamification features

"""
    Feed - Decreases hunger, activates when a User saves a recipe or uses leftovers
    Play (cook_together) - Increases happiness, gives pet exp, activates when a User marks a recipe as completed
    Pet_exp - Increases when Feed or cook_together is called
    Pass_time - Decreases happiness and Increases hunger as time passes
    Expressions - Return expressions to visualise the Pet's status
    Pet_level - Increases when exp exceeds certain numbers
    When the Pet is inactive for a specified amount of time, notify User with current status of the Pet
    Exp should increment after certain levels - i.e. the higher the level the longer it takes to level up
"""

"""Import everything that is needed from other files"""

from flask import Blueprint, jsonify, request
from db import get_db_connection
import time

virtual_pet_bp = Blueprint('virtual_pet', __name__)

# Main loop - continuously update pet's status, handle user input and display information
class Pet:
    def __init__(self, user_id, name="Joe"):
        self.user_id = user_id
        self.name = name
        self.hunger = 50
        self.happiness = 50
        self.level = 1
        self.exp = 0
        self.last_active = time.time()
        self.load_from_db()

    def load_from_db(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT name, hunger, happiness, level, exp, last_active FROM pets WHERE user_id = %s",
            (self.user_id,)
        )
        result = cursor.fetchone()

        if result:
            self.name = result['name']
            self.hunger = float(result['hunger'])
            self.happiness = float(result['happiness'])
            self.level = int(result['level'])
            self.exp = int(result['exp'])
            self.last_active = float(result['last_active'])

        else:
            self.save_to_db()

        cursor.close()
        conn.close()

    def save_to_db(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO pets (user_id, name, hunger, happiness, level, exp, last_active)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (user_id) DO UPDATE SET
                name = EXCLUDED.name,
                hunger = EXCLUDED.hunger,
                happiness = EXCLUDED.happiness,
                level = EXCLUDED.level,
                exp = EXCLUDED.exp,
                last_active = EXCLUDED.last_active
            """,
            (self.user_id, self.name, self.hunger, self.happiness, self.level, self.exp, self.last_active)
        )
        conn.commit()
        cursor.close()
        conn.close()

    def update_inactivity(self):
        """Check when the Pet was last active for and update hunger/happiness."""
        now = time.time()
        inactive_for = now - self.last_active

        if inactive_for >= 60:
            hours_passed = inactive_for / 3600
            self.hunger = min(100, self.hunger + 5 * hours_passed)
            self.happiness = max(0, self.happiness - 5 * hours_passed)
        return inactive_for

    def feed(self):
        self.hunger = max(0, self.hunger - 30)
        self.happiness = min(100, self.happiness + 10)
        self.gain_exp(5)
        self.last_active = time.time()

    def play(self):
        self.happiness = min(100, self.happiness + 20)
        self.hunger = min(100, self.hunger + 10)
        self.gain_exp(10)
        self.last_active = time.time()

    def gain_exp(self, amount):
        self.exp += amount
        exp_required = 100 * (1.5 ** (self.level - 1))
        leveled_up = False

        if self.exp >= exp_required:
            self.exp -= exp_required
            self.level += 1
            leveled_up = True

        return leveled_up

    def pass_time(self):
        self.update_inactivity()
        self.hunger = min(100, self.hunger + 5)
        self.happiness = max(0, self.happiness - 5)

    def status(self):
        inactive_for = self.update_inactivity()
        exp_required = 100 * (1.5 ** (self.level - 1))

        status_msg = {
            "name": self.name,
            "hunger": round(self.hunger, 1),
            "happiness": round(self.happiness, 1),
            "level": self.level,
            "exp": self.exp,
            "exp_required": round(exp_required, 1),
            "inactivity": round(inactive_for, 1),  # In seconds
            "expression": self.expression()
        }
        return status_msg

    def expression(self):
        if self.hunger > 80:
            return "hungry"
        if self.happiness > 80:
            return "excited"
        elif self.happiness > 50:
            return "happy"
        elif self.happiness > 20:
            return "sad"
        else:
            return "crying"

def get_or_create_pet(user_id, pet_name="Joe"):
    if not user_id:
        raise ValueError("user_id is required")
    return Pet(user_id, pet_name)

"""class Game:
    def __init__(self, user_id, pet_name="Joe"):
        self.pet = Pet(user_id, pet_name)
        self.level = 1

    def level_up(self):
        # Levels up the User
        self.level += 1
        print(f"{self.pet.name} would like to celebrate your level up! :D You reached {self.level}!")"""


# Don't instantiate Game at module level - causes errors
# game = Game()  # Commented out

@virtual_pet_bp.route('/debug-db', methods=['GET'])
def debug_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT current_database(), current_user;")
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify({
            'success': True,
            'current_database': result['current_database'],
            'current_user': result['current_user']
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@virtual_pet_bp.route('/status', methods=['GET'])
def get_status():
    user_id = request.args.get('user_id', type=int)
    pet_name = request.args.get('name', 'Joe')

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    pet = Pet(user_id, pet_name)
    return jsonify(pet.status())


@virtual_pet_bp.route('/feed', methods=['POST'])
def feed_pet():
    user_id = request.json.get('user_id')
    pet_name = request.json.get('name', 'Joe')

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    pet = Pet(user_id, pet_name)
    pet.feed()
    pet.save_to_db()
    return jsonify({"message": f"You fed {pet.name}!", "status": pet.status()})


@virtual_pet_bp.route('/play', methods=['POST'])
def play_with_pet():
    user_id = request.json.get('user_id')
    pet_name = request.json.get('name', 'Joe')

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    pet = Pet(user_id, pet_name)
    pet.play()
    pet.save_to_db()
    return jsonify({"message": f"You cooked with {pet.name}!", "status": pet.status()})

# Note for Mat - when Play and Feed are called it should add the points to the point system
"""Feed and play uses the point system"""
