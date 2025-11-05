from flask import Flask
from flask_cors import CORS
from sqlalchemy import text
import os

app = Flask(__name__)
CORS(app)

# Import routes directly (no routes/ folder)
from routes.recipes import Base, engine, recipes_bp
from routes.ingredients import ingredients_bp
from routes.virtualpet import virtual_pet_bp
# from routes.ingredients import ingredients_bp

# Register blueprints
app.register_blueprint(recipes_bp, url_prefix='/api/recipes')
app.register_blueprint(ingredients_bp, url_prefix='/api/ingredients')
app.register_blueprint(virtual_pet_bp, url_prefix='/virtual-pet')

@app.route('/')
def home():
    return {'message': 'Food Wastage API is running!'}, 200

@app.route('/debug-db')
def debug_db():
    """Test to verify which database is connected and how many recipes exist"""
    try:
        with engine.connect() as conn:
            db_name = conn.execute(text("SELECT current_database();")).scalar()
            host = engine.url.host
            count = conn.execute(text("SELECT COUNT(*) FROM recipes;")).scalar()
        return {
            'connected_to': host,
            'database': db_name,
            'recipes_count': count
        }
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    # Base.metadata.create_all(engine)
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)