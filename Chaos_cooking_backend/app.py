from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Import routes directly (no routes/ folder)
from routes.recipes import recipes_bp
from routes.ingredients import ingredients_bp

# Register blueprints
app.register_blueprint(recipes_bp, url_prefix='/api/recipes')
app.register_blueprint(ingredients_bp, url_prefix='/api/ingredients')

@app.route('/')
def home():
    return {'message': 'Food Wastage API is running!'}, 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)