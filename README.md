# 🍳 Chaos Cooking

**A food wastage reduction app that helps users transform leftover ingredients into delicious recipes.**

Chaos Cooking empowers users to reduce food waste by discovering creative recipes using ingredients they already have, before they go bad. Perfect for students, busy professionals, and content creators who want to save money, reduce waste, and gamify their cooking experience.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Team](#-team)

---

## ✨ Features

### Core Functionality
- **Recipe Discovery**: Browse community-uploaded recipes designed to use up leftover ingredients
- **Smart Ingredient Matching**: Search recipes based on what you have in your fridge
- **Upload Your Own Recipes**: Share your leftover-rescue recipes with the community
- **Duplicate Prevention**: Smart validation ensures users don't accidentally upload the same recipe twice
- **Recipe History Tracking**: Track which recipes you've viewed, cooked, favorited, or rated

### User Personas
Our app is designed for:
- 👩‍🎨 **Content Creators** (like Chloe) - Create aesthetic cooking content while reducing waste
- 💼 **Busy Professionals** (like Marcus) - Quick 15-minute meals using leftovers after long workdays  
- 🎓 **Students** (like Emma) - Budget-friendly recipes that save money and reduce dorm food waste

<img width="1468" height="768" alt="image" src="https://github.com/user-attachments/assets/739049c5-da93-4da4-b34b-0f60bf83395c" />


---


## System Architecture - Upload Recipe Flow

### Our application follows a three-tier architecture ensuring clean separation of concerns:

<img width="1024" height="835" alt="Screenshot 2025-10-01 103200" src="https://github.com/user-attachments/assets/b5b7f0ac-ab6b-41f9-94c6-6cfcd355decf" />


</div>

🎯 How the UML Sequence Diagram Works
🎨 Presentation Layer (Frontend)

User clicks "Upload Recipe" button
Recipe form displays input fields
User fills in recipe details (title, description, instructions, ingredients)
Form submits data to Business Logic Layer


This design choice makes sense because:


👥 Recipe sharing - Multiple users can contribute their unique takes on popular dishes
🛡️ Prevents accidents - Users won't accidentally duplicate their own submissions
🌍 Community diversity - Encourages variety in the recipe database
📊 Data integrity - Maintains clean user-specific recipe collections

<img width="680" height="183" alt="Screenshot 2025-10-02 101408" src="https://github.com/user-attachments/assets/4eb8be8d-5c37-4d68-b67a-e7344daee09c" />

This separation means:

- 🔧 Frontend developers can work independently from backend
- 🧪 Business logic can be tested without UI or database
- 🔄 Each layer can be updated without affecting others
- 📈 System is scalable and maintainable


---


## 🛠 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Responsive design for mobile and desktop

### Backend
- **Python Flask** - Lightweight web framework
- **PostgreSQL** - Relational database for recipes, ingredients, and user data
- **psycopg2** - PostgreSQL adapter for Python
- **Flask-CORS** - Cross-Origin Resource Sharing support

### Database
- PostgreSQL 14+
- Pre-populated with sample recipes and ingredients

---

## 🗄 Database Schema

### Tables

**users**
- Stores user account information (username, email, password_hash, name)
- Tracks account creation and updates

**ingredients**
- Library of common leftover ingredients categorized by type
- Includes nutritional information (calories per unit)
- Categories: leftover_protein, leftover_vegetable, leftover_fruit, leftover_starch, pantry

**recipes**
- User-created recipes with instructions, prep/cook time, and difficulty
- Each recipe linked to its creator via `created_by` foreign key
- Includes metadata like servings, prep time, cook time

**recipe_ingredients** (Junction Table)
- Links recipes to their required ingredients
- Stores quantity, unit, and optional notes for each ingredient

**recipe_history**
- Tracks user interactions with recipes
- Actions: 'viewed', 'cooked', 'favorited', 'rated'
- Enables popularity tracking and personalized recommendations

### Key Database Features
- **User-Specific Duplicate Prevention**: Users cannot upload multiple recipes with the same title
- **Shared Recipe Library**: Multiple users can save and interact with the same community recipes
- **Cascade Deletion**: Removing a recipe automatically removes its ingredient associations

---

## 📁 Project Structure

```
Chaos_cooking_backend/
├── app.py                    # Main Flask application
├── db.py                     # Database connection configuration
├── .env                      # Environment variables (not in git)
├── requirements.txt          # Python dependencies
├── routes/
│   ├── recipes.py           # Recipe-related endpoints
│   └── ingredients.py       # Ingredient-related endpoints
├── Recipes_with_sample_data.sql  # Database schema and sample data
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- PostgreSQL 14+
- pip (Python package manager)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Chaos_cooking_backend
```

2. **Set up Python virtual environment** (recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up PostgreSQL database**
```bash
# Create database
createdb chaos_cooking

# Run SQL script to create tables and insert sample data
psql -d chaos_cooking -f Recipes_with_sample_data.sql
```

5. **Configure environment variables**

Create a `.env` file in the root directory:
```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=chaos_cooking
DB_PASSWORD=your_postgres_password
DB_PORT=5432
PORT=5000
```

6. **Run the application**
```bash
python app.py
```

The server will start on `http://localhost:5000`

### Testing the API

Visit these endpoints in your browser:
- `http://localhost:5000/` - Health check
- `http://localhost:5000/api/recipes` - Get all recipes
- `http://localhost:5000/api/ingredients` - Get all ingredients

---

## 📡 API Endpoints

### Recipes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/<id>` | Get single recipe with ingredients |
| POST | `/api/recipes` | Upload new recipe (with duplicate check) |

### Ingredients

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ingredients` | Get all ingredients |
| GET | `/api/ingredients/category/<category>` | Get ingredients by category |
| GET | `/api/ingredients/categories` | Get all available categories |

### Recipe History

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ingredients/recipe-history` | Record user action (viewed, cooked, favorited, rated) |
| GET | `/api/ingredients/recipe-history/user/<user_id>` | Get user's recipe history |

### Example API Request

**Create a new recipe:**
```bash
POST /api/recipes
Content-Type: application/json

{
  "title": "Leftover Pasta Bake",
  "description": "Transform yesterday's pasta into cheesy goodness",
  "instructions": "1. Preheat oven to 350°F...",
  "prep_time": 10,
  "cook_time": 20,
  "servings": 4,
  "difficulty_level": "easy",
  "created_by": 1,
  "ingredients": [
    {"ingredient_id": 22, "quantity": 200, "unit": "gram"},
    {"ingredient_id": 28, "quantity": 100, "unit": "gram"}
  ]
}
```

---

## 🎯 Key Features Implementation

### Upload Recipe with Duplicate Check (UML Flow)

Our recipe upload follows a three-tier architecture:

1. **Presentation Layer**: User submits recipe form
2. **Business Logic Layer**: 
   - Validates required fields
   - Checks if user already has a recipe with the same title
   - If duplicate exists → returns 409 error
   - If valid → proceeds to save
3. **Persistence Layer**: Saves recipe and ingredient associations to database

This ensures users don't accidentally submit the same recipe multiple times while allowing different users to share recipes with the same name.

---

## 👥 Team

### Backend Team
- Mathijs: Recipe endpoints and business logic
- Isaac: Ingredient endpoints and recipe history tracking

### Frontend Team
- Alex: User interface and recipe display
- Andrew: Search functionality and user interactions

---

## 🔮 Future Enhancements

- User authentication and authorization
- Recipe rating and review system
- Advanced search with multiple ingredient filters
- Expiration date tracking for ingredients
- Meal planning calendar
- Nutritional information calculator
- Social sharing features
- Mobile app version

---

## 📝 License

This project is part of the Holberton school, Australia curriculum.

---

## 🤝 Contributing

This is a student project. If you're part of the team:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Happy Cooking! Let's reduce food waste together! 🌱**

Your developers:
- Mathijs
- Alex
- Isaac
- Andrew
