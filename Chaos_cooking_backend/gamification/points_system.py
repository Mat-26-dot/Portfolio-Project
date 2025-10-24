from flask import Blueprint, jsonify
from db import get_db_connection

gamification_bp = Blueprint('gamification', __name__)

@gamification_bp.route('/points/<int:user_id>', methods=['GET'])
def get_user_points(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as recipes_cooked FROM recipe_history WHERE user_id = %s AND action = 'cooked'", (user_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        recipes_cooked = result['recipes_cooked'] if result else 0
        total_points = recipes_cooked * 10
        return jsonify({'success': True, 'data': {'user_id': user_id, 'recipes_cooked': recipes_cooked, 'total_points': total_points}}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@gamification_bp.route('/achievements/<int:user_id>', methods=['GET'])
def get_user_achievements(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as recipes_cooked FROM recipe_history WHERE user_id = %s AND action = 'cooked'", (user_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        recipes_cooked = result['recipes_cooked'] if result else 0
        milestones = [(1, "First Recipe!", "You've cooked your first recipe!"), (5, "Chef in Training", "You've completed 5 recipes!"), (10, "Home Chef", "You've completed 10 recipes!")]
        achievements = [{'title': t, 'message': m, 'unlocked': recipes_cooked >= c} for c, t, m in milestones]
        return jsonify({'success': True, 'data': {'recipes_cooked': recipes_cooked, 'achievements': achievements}}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@gamification_bp.route('/share-stats/<int:user_id>', methods=['GET'])
def get_share_stats(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as recipes_cooked FROM recipe_history WHERE user_id = %s AND action = 'cooked'", (user_id,))
        result1 = cursor.fetchone()
        recipes_cooked = result1['recipes_cooked'] if result1 else 0
        cursor.execute("SELECT COUNT(DISTINCT ri.ingredient_id) as ingredients_saved FROM recipe_history rh JOIN recipe_ingredients ri ON rh.recipe_id = ri.recipe_id WHERE rh.user_id = %s AND rh.action = 'cooked'", (user_id,))
        result2 = cursor.fetchone()
        ingredients_saved = result2['ingredients_saved'] if result2 else 0
        cursor.close()
        conn.close()
        message = f"I saved {ingredients_saved} ingredients by cooking {recipes_cooked} recipes!"
        return jsonify({'success': True, 'data': {'recipes_cooked': recipes_cooked, 'ingredients_saved': ingredients_saved, 'total_points': recipes_cooked * 10, 'share_message': message}}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
