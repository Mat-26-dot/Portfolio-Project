# routes/ingredients.py - Your work
from flask import Blueprint, jsonify, request
from db import get_db_connection

ingredients_bp = Blueprint('ingredients', __name__)

"""
    get_all_ingredients() - Gets all the ingredients
    get_ingredients_by_category() - Filters the ingredients by category
    get_categories() - Lists all the distinct ingredient categories
    add_recipe_history() - Tracks User actions
    get_user_history(user_id) - Gets recipe history for a specific user
"""

@ingredients_bp.route('/', methods=['GET'])
def get_all_ingredients():
    """Get all ingredeents from db"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT 
                id,
                name,
                category,
                unit,
                calories_per_unit,
                created_at
            FROM ingredients
            ORDER BY category, name
        """)
        
        ingredients = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'count': len(ingredients),
            'data': ingredients
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ingredients_bp.route('/category/<string:category>', methods=['GET'])
def get_ingredients_by_category(category):
    """Get ingredients filtered byy category"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT 
                id,
                name,
                category,
                unit,
                calories_per_unit
            FROM ingredients
            WHERE category = %s
            ORDER BY name
        """, (category,))
        
        ingredients = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'count': len(ingredients),
            'category': category,
            'data': ingredients
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ingredients_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all distinct ingredient categories"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT DISTINCT category
            FROM ingredients
            WHERE category IS NOT NULL
            ORDER BY category
        """)
        
        categories = [row['category'] for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'count': len(categories),
            'data': categories
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ingredients_bp.route('/recipe-history', methods=['POST'])
def add_recipe_history():
    """Track user actions - (viewed, cooked, favorited, rated)"""
    try:
        data = request.get_json()
        
        # Validation
        required_fields = ['user_id', 'recipe_id', 'action']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'{field} is required'
                }), 400
        
        # Validate action
        valid_actions = ['viewed', 'cooked', 'favorited', 'rated']
        if data['action'] not in valid_actions:
            return jsonify({
                'success': False,
                'error': f'action must be one of: {", ".join(valid_actions)}'
            }), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO recipe_history (user_id, recipe_id, action, rating, notes)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, created_at
        """, (
            data['user_id'],
            data['recipe_id'],
            data['action'],
            data.get('rating'),
            data.get('notes')
        ))
        
        history_entry = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Action recorded successfully',
            'data': history_entry
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ingredients_bp.route('/recipe-history/user/<int:user_id>', methods=['GET'])
def get_user_history(user_id):
    """Get recipe history for a specific user"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT 
                rh.id,
                rh.action,
                rh.rating,
                rh.notes,
                rh.created_at,
                r.title as recipe_title,
                r.id as recipe_id
            FROM recipe_history rh
            JOIN recipes r ON rh.recipe_id = r.id
            WHERE rh.user_id = %s
            ORDER BY rh.created_at DESC
        """, (user_id,))
        
        history = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'count': len(history),
            'data': history
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500