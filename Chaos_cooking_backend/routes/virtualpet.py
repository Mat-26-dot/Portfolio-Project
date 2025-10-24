# Backend code logic for gamification features
"""Import everything that is needed from other files"""

from flask import Blueprint, jsonify, request
from db import get_db_connection
import time
import random

virtual_pet_bp = Blueprint('virtual_pet', __name__)

# Main loop - continuosly update pet's status, handle user input and display information
class Pet:
    def __init__(self, user_id, name):
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
        pet = conn.execute(
            "SELECT * FROM pets WHERE user_id = ?", (self.user_id,)
        ).fetchone()
        conn.close()

        if pet:
            self.name = pet["name"]
            self.hunger = pet["hunger"]
            self.happiness = pet["happiness"]
            self.level = pet["level"]
            self.exp = pet["exp"]
            self.last_active = pet["last_active"]
        else:
            self.save_to_db()

    def save_to_db(self):
        conn = get_db_connection()
        conn.execute("""
            INSERT INTO pets (user_id, name, hunger, happiness, level, exp, last_active)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id) DO UPDATE SET
                name=excluded.name,
                hunger=excluded.hunger,
                happiness=excluded.happiness,
                level=excluded.level,
                exp=excluded.exp,
                last_active=excluded.last_active
        """, (self.user_id, self.name, self.hunger, self.happiness, self.level, self.exp, self.last_active))
        conn.commit()
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
            "inactivity": round(inactive_for, 1), # In seconds
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

class Game:
    def __init__(self):
        self.pet = Pet("Joe")
        # Exp increases Users points? - Ask Mat to help with this
        self.level = 1

    def level_up(self):
        # Levels up the User
        self.level += 1
        print(f"{self.pet.name} would like to celebrate your level up! :D You reached {self.level}!")


game = Game()

@virtual_pet_bp.route('/status', methods=['GET'])
def get_status():
    user_id = request.args.get('user_id', type=int)
    pet = Pet(user_id)
    return jsonify(pet.status())

@virtual_pet_bp.route('/feed', methods=['POST'])
def feed_pet():
    user_id = request.json.get('user_id')
    pet = Pet(user_id)
    pet.feed()
    pet.save_to_db()
    return jsonify({"message": f"You fed {pet.name}!", "status": pet.status()})

@virtual_pet_bp.route('/play', methods=['POST'])
def play_with_pet():
    user_id = request.json.get('user_id')
    pet = Pet(user_id)
    pet.play()
    pet.save_to_db()
    return jsonify({"message": f"You cooked with {pet.name}!", "status": pet.status()})

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
# Note for Mat - when Play and Feed are called it should add the points to the point system
"""Feed and play uses the point system"""