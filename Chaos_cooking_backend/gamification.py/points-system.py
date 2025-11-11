"""Points system"""
from flask import Blueprint, jsonify, request
from db import get_db_connection

ingredients_bp = Blueprint('ingredients', __name__)

"""
    get_user_points(user_id) - Gets the points from a specific user
    get_user_achievements(user_id) - Lists the achievements linked to a user
    get_share_stats - Gets sharable stats for social media
"""

@ingredients_bp.route('/gamification/points/<int:user_id>', methods=['GET'])
def get_user_points(user_id):
    """Get total points for user (10 points per recipe cooked)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT COUNT(*) as recipes_cooked
            FROM recipe_history
            WHERE user_id = %s AND action = 'cooked'
        """, (user_id,))
        
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        
        recipes_cooked = result['recipes_cooked'] if result else 0
        total_points = recipes_cooked * 10
        
        return jsonify({
            'success': True,
            'data': {
                'user_id': user_id,
                'recipes_cooked': recipes_cooked,
                'total_points': total_points
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ingredients_bp.route('/gamification/achievements/<int:user_id>', methods=['GET'])
def get_user_achievements(user_id):
    """Get achievement milestones for user"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT COUNT(*) as recipes_cooked
            FROM recipe_history
            WHERE user_id = %s AND action = 'cooked'
        """, (user_id,))
        
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        
        recipes_cooked = result['recipes_cooked'] if result else 0
        
        achievements = []
        milestones = [
            (1, "First Recipe!", "You've cooked your first recipe!"),
            (5, "Chef in Training", "You've completed 5 recipes!"),
            (10, "Home Chef", "You've completed 10 recipes!"),
            (25, "Master Chef", "You've completed 25 recipes!"),
            (50, "Waste Warrior", "You've completed 50 recipes!")
        ]
        
        for count, title, message in milestones:
            if recipes_cooked >= count:
                achievements.append({
                    'title': title,
                    'message': message,
                    'unlocked': True,
                    'unlock_count': count
                })
            else:
                achievements.append({
                    'title': title,
                    'message': message,
                    'unlocked': False,
                    'unlock_count': count
                })
        
        return jsonify({
            'success': True,
            'data': {
                'recipes_cooked': recipes_cooked,
                'achievements': achievements
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@ingredients_bp.route('/gamification/share-stats/<int:user_id>', methods=['GET'])
def get_share_stats(user_id):
    """Get shareable stats for social media"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT COUNT(*) as recipes_cooked
            FROM recipe_history
            WHERE user_id = %s AND action = 'cooked'
        """, (user_id,))
        
        cooked_result = cursor.fetchone()
        recipes_cooked = cooked_result['recipes_cooked'] if cooked_result else 0
        
        cursor.execute("""
            SELECT COUNT(DISTINCT ri.ingredient_id) as ingredients_saved
            FROM recipe_history rh
            JOIN recipe_ingredients ri ON rh.recipe_id = ri.recipe_id
            WHERE rh.user_id = %s AND rh.action = 'cooked'
        """, (user_id,))
        
        ingredient_result = cursor.fetchone()
        ingredients_saved = ingredient_result['ingredients_saved'] if ingredient_result else 0
        
        cursor.close()
        conn.close()
        
        share_message = f"I've saved {ingredients_saved} ingredients from waste by cooking {recipes_cooked} recipes with Chaos Cooking! 🍳♻️"
        
        return jsonify({
            'success': True,
            'data': {
                'recipes_cooked': recipes_cooked,
                'ingredients_saved': ingredients_saved,
                'total_points': recipes_cooked * 10,
                'share_message': share_message
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500