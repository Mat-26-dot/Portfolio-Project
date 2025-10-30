from persistence.repository import SQLAlchemyRepository
from routes.recipes import Recipe

"""Facade file for further logic control"""
class Facade:
    def __init__(self):
        self.recipe_repo = SQLAlchemyRepository(Recipe)

    # --- Recipes ---
    def create_recipe(self, recipe_data):
        recipe = Recipe(**recipe_data)
        self.recipe_repo.add(recipe)
        return recipe

    def get_recipe(self, recipe_id):
        return self.place_repo.get(recipe_id)

    def get_all_recipes(self):
        return self.recipe_repo.get_all()

    def update_recipe(self, recipe_id, recipe_data):
        self.recipe_repo.update(recipe_id, recipe_data)

    # --- Recipe Relationship methods ---
    def get_recipe_ingredients(self, recipe_id):
        recipe = self.recipe_repo.get(recipe_id)
        return recipe.ingredients_r

    """Space if we want reviews on recipes"""

    def get_recipe_created_by(self, recipe_id):
        recipe = self.recipe_repo.get(recipe_id)
        return recipe.created_by_r