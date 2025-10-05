# Recipe Back-end Logic
"""Import everything that is needed from other files"""
from datetime import datetime
import uuid


# Define the many-to-many table

"""Recipes should have to the User-id that created it"""

# Create a Recipe class
"""
    Recipe class:
    Recipe Title
    Recipe id - Unique ID for recipes
    Created_by - User-ID that added the recipe
    Created_at
    Updated_at
    Description? - Brief explanation of Recipe
    Ingredients - Ingredients needed
    Method - How to make the recipe
    Time - How long it takes to make
    Difficulty? - How easy or challenging the recipe is
    Reviews? - A few reviews if the recipe is public?
"""

class Recipe():
    """How the data is saved to the DataBase"""
    __tablename__ = 'Recipes'
    # Recipe ID
    id =
    # The User ID that uploaded
    _owner_id =
    # When the recipe was created and/or updated
    created_at =
    updated_at =
    # Recipe title
    _title =
    # Breif description (optional?)
    _description =
    # Grab ingredients from the ingredients table based on IDs
    _ingredients_r =
    # Method/instrcutions to make recipe
    _rec_method =
    # Cook time
    _cook_time =
    # Difficulty of the recipe
    _difficulty =
    # Grab a few reviews (unsure about if we will do this)
    # _Reviews = 
    owner_r =

    def __init__(self, title, description, rec_method, cook_time, difficulty, owner_id):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.title = title
        self.description = description
        self.rec_method = rec_method
        self.cook_time = cook_time
        self.difficulty = difficulty
        self.owner_id = owner_id
        self.ingredients = [] # List to store related ingredients
        # self.reviews = [] - List to store related reviews

    # -- Getters and Setters --
    @property
    def title(self):
        """Returns the recipe title value"""
        return self._title

    @title.setter
    def title(self, value):
        """Setter for Recipe title"""
        # check the recipe title is up to a max alphabet count after removing whitespace
        valid_title = 0 < len(value.strip()) <= 100
        if valid_title:
            self._title = value.strip()
        else:
            raise ValueError("Recipe title is too long!")

    @property
    def description(self):
        """Returns the Recipe description"""
        return self._description

    @description.setter
    def description(self, value):
        """Setter for Recipe description"""
        self._description = value

    @property
    def cook_time(self):
        """Returns value of cook_time"""
        return self._cook_time

    @cook_time.setter
    def cook_time(self, value):
        """Setter for Recipe cook_time"""
        if isinstance(value, float) and value > 0.0:
            self._cook_time = value
        else:
            raise ValueError("Invalid cook time specified!")

    @property
    def difficulty(self):
        """Returns value for Recipe difficulty"""
        return self._difficulty

    @difficulty.setter
    def difficulty(self, value):
        """Setter for Recipe difficulty"""
        if isinstance(value, int) and value > 0 and value <= 10:
            self._difficulty = value
        else:
            raise ValueError("Invalid value specified for difficulty!")

    # --- Methods ---
