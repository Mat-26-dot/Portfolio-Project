# Backend code logic for gamification features
"""Import everything that is needed from other files"""

import time
import random

# Main loop - continuosly update pet's status, handle user input and display information
class Pet:
    def __init__(self, name):
        self.name = name
        self.hunger = 50
        self.happiness = 50
        self.level = 1
        self.exp = 0

    def feed(self):
        self.hunger = max(0, self.hunger - 30)
        self.happiness = min(100, self.happiness + 10)
        self.gain_exp(5)

    def play(self):
        self.happiness = min(100, self.happiness + 20)
        self.hunger = min(100, self.hunger + 10)
        self.gain_exp(10)

    def gain_exp(self, amount):
        self.exp += amount
        if self.exp >= 100:
            self.level += 1
            self.exp = 0

    def pass_time(self):
        self.hunger = min(100, self.hunger + 5)
        self.happiness = max(0, self.happiness - 5)

    def status(self):
        if self.hunger >= 90:
            print(f"{self.name} is very hungry >-<! Feed them by making a recipe!")
            self.happiness = max(0, self.happiness - 10)
        if self.happiness <= 20:
            print(f"{self.name} is sad ;_; Try cooking a meal together!")

    def expressions(self):
        if self.happiness > 80:
            print(f"{self.name}")
        elif self.happiness > 50:
            print(f"{self.name}")
        elif self.happiness > 20:
            print(f"{self.name}")
        else:
            print(f"{self.name}")

class Game:
    def __init__(self):
        self.pet = Pet("Joe")
        # Exp increases Users points? - Ask Mat to help with this
        self.level = 1

    """ def feed_pet(self):
        self.pet.feed() # When a User saves a recipe or uses leftover ingredients
        self.exp += 5 # Gain exp for feeding the pet
        if self.pet.hunger < 20 and self.pet.happiness > 70:
            print(f"{self.pet.name} is happy and satisified! ^-^")

    def cook_together(self):
        self.pet.play() # When a User cooks a recipe (could try to have the pet interact with the steps in real-time)
        if self.pet.happiness >= 90:
            self.level_up()
            self.pet.level += 1 """

    def level_up(self):
        # Levels up the User
        self.level += 1
        print(f"{self.pet.name} would like to celebrate your level up! :D You reached {self.level}!")

    def main_loop(self):
        print("This is your virtual pet to cook your recipes with!")
        while True:
            print("1. Feed pet")
            print("2. Cook together")
            print("3. Check status")
            print("4. Exit")
            choice = input("Enter your choice (1-4): ")

            if choice == '1':
                self.pet.feed()
            elif choice == '2':
                self.pet.play()
                if self.pet.happiness >= 90:
                    self.level_up()
            elif choice == '3':
                self.pet.status()
            elif choice == '4':
                print("See ya later!")
                break
            else:
                print("Invalid input. Try again.")

            self.pet.pass_time()
            time.sleep(1)


"""
    Feed - Decreases hunger, activates when a User saves a recipe or uses leftovers
    Play (cook_together) - Increases happiness, gives pet exp, activates when a User marks a recipe as completed
    Pet_exp - Increases when Feed or cook_together is called
    Pass_time - Decreases happiness and Increases hunger as time passes
    Expressions - Return expressions to visualise the Pet's status
    Pet_level - Increases when exp exceeds certain numbers
"""
# Note for Mat - when Play and Feed are called it should add the points to the point system
