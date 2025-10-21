# Backend code logic for gamification features
"""Import everything that is needed from other files"""

"""
    Additional features to add:
    - Sleep or something that increases energy
    - Pass_time or something that simulates the passage of time
    with possible decreases to Happiness, Energy, and increasing Hunger
    - Use a GUI library to allow for animated sprites, interactive buttons
    and visual feedback on pet's status
"""

# Main loop - continuosly update pet's status, handle user input and display information
class Pet:
    def __init__(self, name):
        self.name = name
        self.hunger = 50
        self.happiness = 50
        self.energy = 50
        self.level = 1

    def status(self):
        if self.hunger >= 90:
            print(f"{self.name} is very hungry >-<! Feed them by making a recipe!")
            self.happiness -= 10
        if self.happiness <= 20:
            print(f"{self.name} is sad ;_; Try cooking a meal together!")
            self.energy -= 5

class Game:
    def __init__(self):
        self.pet = Pet("Joe")
        # Exp increases Users points? - Ask Mat to help with this
        self.exp = 0
        self.level = 1

    def feed_pet(self):
        self.pet.feed() # When a User saves a recipe or uses leftover ingredients
        self.exp += 5 # Gain exp for feeding the pet
        if self.pet.hunger < 20 and self.pet.happiness > 70:
            print(f"{self.pet.name} is happy and satisified! ^-^")

    def cook_together(self):
        self.pet.play() # When a User cooks a recipe (could try to have the pet interact with the steps in real-time)
        if self.pet.happiness >= 90:
            self.level_up()
            self.pet.level += 1

    def level_up(self):
        # Levels up the User
        self.level += 1
        print(f"{self.pet.name} would like to celebrate your level up! :D You reached {self.level}!")
