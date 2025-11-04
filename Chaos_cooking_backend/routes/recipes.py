# Isaac's backend code
# Recipe Back-end Logic
"""Import everything that is needed from other files"""

from datetime import datetime
import uuid
from sqlalchemy import Column, String, Float, Integer, Text, DateTime, Table, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from flask import Blueprint, jsonify, request

Base = declarative_base()

recipes_bp = Blueprint('recipes', __name__)

# Define the many-to-many table
recipe_ingredients = Table(
    'recipe_ingredients',
    Base.metadata,
    Column('recipe_id', Integer, ForeignKey('recipes.id'), primary_key=True),
    Column('ingredient_id', Integer, ForeignKey('ingredients.id'), primary_key=True)
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
    Description - Brief explanation of Recipe
    Ingredients - Ingredients needed
    Method - How to make the recipe
    Prep_Time - How long it takes to prepare the recipe
    Cook_time - How long the recipe takes to cook
    Servings - How many servings
    Difficulty - How easy or challenging the recipe is
"""

class Ingredient(Base):
    __tablename__ = 'ingredients'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100))
    unit = Column(String(50))
    calories_per_unit = Column(Float)
    created_at = Column(DateTime, default=datetime.now)

    recipes = relationship(
        "Recipe",
        secondary="recipe_ingredients",
        back_populates="ingredients"
    )

class Recipe(Base):
    """Hw the data is saved to the DataBase"""
    __tablename__ = 'recipes'
    # Recipe ID
    id = Column(Integer, primary_key=True, autoincrement=True)
    # The User ID that uploaded
    _created_by = Column("created_by", Integer)
    # When the recipe was created and/or updated
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())
    # Recipe title
    _title = Column("title", String(100), nullable=False)
    # Breif description (optional?)
    _description = Column("description", Text, nullable=False)
    # Grab ingredients from the ingredients table based on IDs
    # _ingredients_r = relationship("Ingredients", secondary=recipe_ingredients, back_populates= 'recipe_r')
    # Method/instrcutions to make recipe
    _instructions = Column("instructions", Text, nullable=False)
    # Cook time
    _cook_time = Column("cook_time", Float, nullable=False)
    # Difficulty of the recipe
    _difficulty = Column(Integer, nullable=False)
    # Grab a few reviews (unsure about if we will do this)
    # _Reviews
    # owner_r = relationship("User", back_populates="recipes_r")

    _prep_time = Column("prep_time", Integer)
    _servings = Column("servings", Integer)

    ingredients = relationship(
        "Ingredient",
        secondary=recipe_ingredients,
        back_populates="recipes"
    )

    def __init__(self, title, description, instructions, created_by, cook_time=None, prep_time=None, servings=1, difficulty=None):
        #self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.title = title
        self.description = description
        self._instructions = instructions
        self._cook_time = cook_time
        self._servings = servings
        self._prep_time = prep_time
        self._difficulty = difficulty
        self._created_by = created_by
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
        if isinstance(value, (int, float)) and value > 0.0:
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

    @property
    def instructions(self):
        """Returns the recipe instructions"""
        return self._instructions

    @property
    def created_by(self):
        """Returns the user who created the recipe"""
        return self._created_by

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
    pass
# --- Endpoints ---

""" Route /recipes GET all recipes
    Route /user/recipes GET all recipes from a user
    Route /recipes/most_viewed GET recipes with most viewed, made, etc (Maybe)
    Route /user/recipes POST add a new recipe for that user (have an option for it to be public/private)
    """
# --- Database Setup ---
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Create database engine
DATABASE_URL = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

# --- Flask Routes ---
@recipes_bp.route('/', methods=['GET'])
def get_all_recipes():
    """Test endpoint to get all recipes"""
    try:
        session = Session()
        recipes = session.query(Recipe).all()

        result = []
        for recipe in recipes:
            result.append({
                'id': recipe.id,
                'title': recipe.title,
                'description': recipe.description,
                'cook_time': recipe.cook_time
            })

        session.close()
        return jsonify({'success': True, 'data': result, 'count': len(result)}), 200

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@recipes_bp.route('/test', methods=['GET'])
def test_connection():
    """Simple test to see if endpoint responds"""
    return jsonify({'message': 'Recipes endpoint is working!', 'status': 'ok'}), 200

@recipes_bp.route('/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """Get a single recipe by ID"""
    try:
        session = Session()
        recipe = session.query(Recipe).filter(Recipe.id == recipe_id).first()

        if not recipe:
            return jsonify({'success': False, 'error': 'Recipe not found'}), 404

        result = {
            'id': recipe.id,
            'title': recipe.title,
            'description': recipe.description,
            'instructions': recipe.instructions,
            'cook_time': recipe.cook_time,
            'created_by': recipe.created_by
        }

        session.close()
        return jsonify({'success': True, 'data': result}), 200

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@recipes_bp.route('/', methods=['POST'])
def create_recipe():
    """Create a new recipe"""
    try:
        data = request.get_json()

        # Validate required fields
        required = ['title', 'description', 'instructions', 'created_by']
        for field in required:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing {field}'}), 400

        session = Session()

        new_recipe = Recipe(
            title=data['title'],
            description=data['description'],
            difficulty=data.get('difficulty'),
            instructions=data['instructions'],
            created_by=data['created_by'],
            cook_time=data.get('cook_time'),
            servings=data.get('servings', 1)
        )

        session.add(new_recipe)
        session.commit()

        result = {
            'id': new_recipe.id,
            'title': new_recipe.title,
            'message': 'Recipe created successfully'
        }

        session.close()
        return jsonify({'success': True, 'data': result}), 201

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@recipes_bp.route('/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    """Update an existing recipe"""
    try:
        data = request.get_json()
        session = Session()

        recipe = session.query(Recipe).filter(Recipe.id == recipe_id).first()

        if not recipe:
            return jsonify({'success': False, 'error': 'Recipe not found'}), 404

        # Update fields if provided
        if 'title' in data:
            recipe.title = data['title']
        if 'description' in data:
            recipe.description = data['description']
        if 'instructions' in data:
            recipe.instructions = data['instructions']
        if 'cook_time' in data:
            recipe.cook_time = data['cook_time']

        session.commit()
        session.close()

        return jsonify({'success': True, 'message': 'Recipe updated successfully'}), 200

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@recipes_bp.route('/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    """Delete a recipe"""
    try:
        session = Session()

        recipe = session.query(Recipe).filter(Recipe.id == recipe_id).first()

        if not recipe:
            return jsonify({'success': False, 'error': 'Recipe not found'}), 404

        session.delete(recipe)
        session.commit()
        session.close()

        return jsonify({'success': True, 'message': 'Recipe deleted successfully'}), 200

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@recipes_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_recipes(user_id):
    """Get all recipes by a specific user"""
    try:
        session = Session()
        recipes = session.query(Recipe).filter(Recipe._created_by == user_id).all()

        result = []
        for recipe in recipes:
            result.append({
                'id': recipe.id,
                'title': recipe.title,
                'description': recipe.description,
                'cook_time': recipe.cook_time
            })

        session.close()
        return jsonify({'success': True, 'data': result, 'count': len(result)}), 200

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
