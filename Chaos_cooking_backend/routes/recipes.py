# Isaac's backend code
# Recipe Back-end Logic
"""Import everything that is needed from other files"""

from datetime import datetime
import uuid
from sqlalchemy import Column, String, Float, Integer, Text, DateTime, Table, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from flask import Blueprint

Base = declarative_base()

recipes_bp = Blueprint('recipes', __name__)

# Define the many-to-many table
recipe_ingredients = Table(
    'recipe_ingredient',
    Base.metadata,
    Column('recipe_id', String(60), ForeignKey('recipe.id'), primary_key=True),
    Column('ingredient_id', String(60), ForeignKey('ingredient.id'), primary_key=True)
)

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

class Recipe(Base):
    """How the data is saved to the DataBase"""
    __tablename__ = 'Recipes'
    # Recipe ID
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    # The User ID that uploaded
    _created_by = Column("created_by", String(60), ForeignKey('users.id'), nullable=False)
    # When the recipe was created and/or updated
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())
    # Recipe title
    _title = Column("title", String(100), nullable=False)
    # Breif description (optional?)
    _description = Column("description", Text, nullable=False)
    # Grab ingredients from the ingredients table based on IDs
    _ingredients_r = relationship("Ingredients", secondary=recipe_ingredients, back_populates= 'recipe_r')
    # Method/instrcutions to make recipe
    _instructions = Column("instructions", Text, nullable=False)
    # Cook time
    _cook_time = Column("cook_time", Float, nullable=False)
    # Difficulty of the recipe
    _difficulty = Column("difficulty", Integer, nullable=False)
    # Grab a few reviews (unsure about if we will do this)
    # _Reviews = 
    owner_r = relationship("User", back_populates="recipes_r")

    def __init__(self, title, description, instructions, cook_time, difficulty, created_by):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.title = title
        self.description = description
        self.instructions = instructions
        self.cook_time = cook_time
        self.difficulty = difficulty
        self.created_by = created_by
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
        if isinstance(value, int) and value > 0 and value < 10:
            self._difficulty = value
        else:
            raise ValueError("Invalid value specified for difficulty!")

    # --- Methods ---
    def save(self):
        """Update the timestamp"""
        self.updated_at = datetime.now()

    def add_ingredient(self, ingredient):
        """Add the ingredients to the recipe"""
        self.ingredients.append(ingredient)

    """def add_review(self, review):
    Add a review to the recipe
    self.reviews.append(review)"""

    @staticmethod
    def recipe_exists(recipe_id):
        """Search through all Recipes to ensure the specified recipe_id exists"""

# --- Endpoints ---

""" Route /recipes GET all recipes
    Route /user/recipes GET all recipes from a user
    Route /recipes/most_viewed GET recipes with most viewed, made, etc (Maybe)
    Route /user/recipes POST add a new recipe for that user (have an option for it to be public/private)
    """
