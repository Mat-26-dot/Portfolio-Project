
-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Ingredients table
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    unit VARCHAR(20) DEFAULT 'piece',
    calories_per_unit DECIMAL(6,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Recipes table
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    prep_time INTEGER, -- in minutes
    cook_time INTEGER, -- in minutes
    servings INTEGER DEFAULT 1,
    difficulty_level VARCHAR(20) DEFAULT 'medium',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Recipe Ingredients junction table
CREATE TABLE recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity DECIMAL(8,2) NOT NULL,
    unit VARCHAR(20),
    notes TEXT
);

-- Create Recipe History table
CREATE TABLE recipe_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    recipe_id INTEGER REFERENCES recipes(id),
    action VARCHAR(50) NOT NULL, -- 'viewed', 'cooked', 'favorited', 'rated'
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Pets table
CREATE TABLE IF NOT EXISTS pets (
    user_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL DEFAULT 'Joe',
    hunger NUMERIC(5,2) NOT NULL DEFAULT 50,
    happiness NUMERIC(5,2) NOT NULL DEFAULT 50,
    level INT NOT NULL DEFAULT 1,
    exp INT NOT NULL DEFAULT 0,
    last_active DOUBLE PRECISION NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())
);

-- INSERT SAMPLE DATA

-- Sample Users (Real personas for leftover app)
INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES
('chloe_creates', 'chloe.martinez@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7gKLzH1jSe', 'Chloe', 'Martinez'),
('marcus_busy', 'marcus.thompson@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7gKLzH1jSe', 'Marcus', 'Thompson'),
('emma_student', 'emma.chen@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7gKLzH1jSe', 'Emma', 'Chen');

-- Sample Ingredients (Common leftover ingredients by category)
INSERT INTO ingredients (name, category, unit, calories_per_unit) VALUES
-- Common Leftover Proteins
('Cooked Chicken', 'leftover_protein', 'gram', 2.39),
('Leftover Turkey', 'leftover_protein', 'gram', 1.89),
('Hard-boiled Eggs', 'leftover_protein', 'piece', 78),
('Cooked Ground Beef', 'leftover_protein', 'gram', 2.5),
('Canned Beans', 'leftover_protein', 'gram', 1.27),
('Leftover Ham', 'leftover_protein', 'gram', 1.45),

-- Leftover Vegetables (commonly found in fridges)
('Wilted Spinach', 'leftover_vegetable', 'gram', 0.23),
('Soft Carrots', 'leftover_vegetable', 'gram', 0.41),
('Leftover Broccoli', 'leftover_vegetable', 'gram', 0.34),
('Overripe Tomatoes', 'leftover_vegetable', 'piece', 18),
('Sad Bell Peppers', 'leftover_vegetable', 'piece', 24),
('Wilting Celery', 'leftover_vegetable', 'stalk', 6),
('Half Onion', 'leftover_vegetable', 'piece', 20),
('Leftover Mushrooms', 'leftover_vegetable', 'gram', 0.22),
('Aging Potatoes', 'leftover_vegetable', 'piece', 77),

-- Common Leftover Fruits
('Browning Bananas', 'leftover_fruit', 'piece', 105),
('Overripe Berries', 'leftover_fruit', 'gram', 0.57),
('Soft Apples', 'leftover_fruit', 'piece', 95),
('Aging Avocado', 'leftover_fruit', 'piece', 234),

-- Leftover Grains & Starches
('Day-old Bread', 'leftover_starch', 'slice', 75),
('Leftover Rice', 'leftover_starch', 'gram', 1.3),
('Cold Pasta', 'leftover_starch', 'gram', 1.31),
('Stale Tortillas', 'leftover_starch', 'piece', 104),

-- Pantry Staples (for rescue recipes)
('Olive Oil', 'pantry', 'ml', 8.84),
('Salt', 'pantry', 'gram', 0),
('Black Pepper', 'pantry', 'gram', 2.51),
('Garlic Powder', 'pantry', 'gram', 3.31),
('Soy Sauce', 'pantry', 'ml', 0.6),
('Hot Sauce', 'pantry', 'ml', 0.3),
('Lemon Juice', 'pantry', 'ml', 0.6),
('Cheese', 'pantry', 'gram', 4.0),
('Butter', 'pantry', 'gram', 7.17),
('Flour', 'pantry', 'gram', 3.64);

-- Sample Recipes (Leftover-focused recipes for waste reduction)
INSERT INTO recipes (title, description, instructions, prep_time, cook_time, servings, difficulty_level, created_by) VALUES
('Banana Bread Rescue', 
 'Turn those brown bananas into TikTok-worthy banana bread! #NoBananaWaste', 
 '1. Preheat oven to 350°F (175°C). Mash browning bananas in a bowl.
2. Mix in melted butter, flour, and a pinch of salt.
3. Pour into a greased loaf pan and bake for 45 minutes.
4. Cool completely before slicing. Perfect for content creation!
5. Pro tip: Add chocolate chips for extra aesthetic points!',
 10, 45, 8, 'easy', 1),

('Leftover Chicken Fried Rice', 
 'Quick 15-minute meal using yesterday chicken and rice. Perfect after work!', 
 '1. Heat oil in a large pan over high heat.
2. Add cold leftover rice, breaking up clumps with a spoon.
3. Push rice to one side, scramble hard-boiled eggs on the other.
4. Add leftover chicken pieces and any sad vegetables.
5. Season with soy sauce, garlic powder, and pepper.
6. Stir everything together and cook for 3-4 minutes. Done!',
 5, 10, 2, 'easy', 2),

('Chaos Smoothie Bowl', 
 'Student budget hack: throw overripe fruits into a smoothie bowl! #ChaosCooking', 
 '1. Blend overripe berries, browning bananas, and any soft fruit.
2. Add a splash of water if too thick.
3. Pour into a bowl and get creative with toppings.
4. Use leftover nuts, seeds, or even crumbled day-old bread as crunch.
5. Perfect for dorm life and Instagram posts!',
 5, 0, 1, 'easy', 3),

('Leftover Veggie Scramble', 
 'Use up those sad vegetables before they go bad. Gamified cooking!', 
 '1. Dice up any leftover or wilting vegetables you have.
2. Heat oil in a pan and add harder veggies first (potatoes, carrots).
3. Add softer veggies (peppers, mushrooms) after 2-3 minutes.
4. Crack eggs directly into the pan and scramble everything together.
5. Season with whatever you have - salt, pepper, hot sauce!
6. Serve with day-old bread toasted up.',
 8, 12, 2, 'easy', 2),

('Bread Pudding Hack', 
 'Transform stale bread into dessert magic! Budget-friendly and aesthetic.', 
 '1. Tear day-old bread into chunks and place in a baking dish.
2. Mix any leftover fruit pieces in with the bread.
3. Beat eggs with a splash of whatever liquid you have (milk works).
4. Pour over bread and let soak for 10 minutes.
5. Bake at 350°F for 25 minutes until golden.
6. Dust with whatever sweet stuff you have - perfect for content!',
 15, 25, 4, 'medium', 1);

-- Recipe Ingredients relationships
-- Recipe 1: Banana Bread Rescue (Chloe's aesthetic content)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 16, 3, 'piece'),    -- Browning Bananas
(1, 29, 100, 'gram'),   -- Butter
(1, 30, 200, 'gram'),   -- Flour
(1, 25, 1, 'gram');     -- Salt

-- Recipe 2: Leftover Chicken Fried Rice (Marcus's quick meal)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(2, 1, 150, 'gram'),    -- Cooked Chicken
(2, 21, 200, 'gram'),   -- Leftover Rice
(2, 3, 2, 'piece'),     -- Hard-boiled Eggs
(2, 13, 0.5, 'piece'),  -- Half Onion
(2, 11, 1, 'piece'),    -- Sad Bell Peppers
(2, 28, 15, 'ml'),      -- Soy Sauce
(2, 24, 15, 'ml');      -- Olive Oil

-- Recipe 3: Chaos Smoothie Bowl (Emma's budget hack)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(3, 16, 2, 'piece'),    -- Browning Bananas
(3, 17, 100, 'gram'),   -- Overripe Berries
(3, 18, 1, 'piece'),    -- Soft Apples
(3, 20, 1, 'slice');    -- Day-old Bread (for crunch)

-- Recipe 4: Leftover Veggie Scramble (Marcus's gamified cooking)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(4, 7, 50, 'gram'),     -- Wilted Spinach
(4, 8, 100, 'gram'),    -- Soft Carrots
(4, 11, 1, 'piece'),    -- Sad Bell Peppers
(4, 14, 100, 'gram'),   -- Leftover Mushrooms
(4, 3, 3, 'piece'),     -- Hard-boiled Eggs
(4, 24, 15, 'ml'),      -- Olive Oil
(4, 25, 1, 'gram'),     -- Salt
(4, 20, 2, 'slice');    -- Day-old Bread

-- Recipe 5: Bread Pudding Hack (Chloe's content creation)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(5, 20, 6, 'slice'),    -- Day-old Bread
(5, 17, 50, 'gram'),    -- Overripe Berries
(5, 3, 2, 'piece'),     -- Hard-boiled Eggs
(5, 29, 25, 'gram');    -- Butter

-- Sample Recipe History (realistic user interactions for leftover app)
INSERT INTO recipe_history (user_id, recipe_id, action, rating, notes) VALUES
-- Chloe (content creator) interactions
(1, 1, 'cooked', 5, 'OMG this got 50K views on TikTok! #BananaRescue trending'),
(1, 5, 'favorited', NULL, 'Perfect aesthetic for my feed - need to try this'),
(1, 3, 'viewed', NULL, 'Could make this look so trendy with good lighting'),

-- Marcus (busy professional) interactions  
(2, 2, 'cooked', 4, 'Literally saved my Tuesday after 12hr work day. So quick!'),
(2, 4, 'cooked', 5, 'Leftover Roulette strikes again! Used random fridge veggies'),
(2, 1, 'viewed', NULL, 'Might try this on weekend when I have more time'),

-- Emma (student) interactions
(3, 3, 'cooked', 5, 'Saved me $8 on breakfast this week! Posted on #ChaosCooking'),
(3, 2, 'cooked', 4, 'Used week-old rice and leftover takeout chicken - still bomb'),
(3, 5, 'viewed', NULL, 'Gonna make this when bread goes stale again'),
(3, 4, 'cooked', 3, 'Good but ran out of hot sauce halfway through');

-- Sample Starter Pets
INSERT INTO pets (user_id, name)
SELECT id, 'Fluffy' FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Create some useful views for common queries
CREATE VIEW recipe_details AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.prep_time,
    r.cook_time,
    r.servings,
    r.difficulty_level,
    u.username as created_by_username,
    r.created_at
FROM recipes r
JOIN users u ON r.created_by = u.id;

CREATE VIEW recipe_with_ingredients AS
SELECT 
    r.title as recipe_title,
    i.name as ingredient_name,
    ri.quantity,
    ri.unit,
    i.category as ingredient_category
FROM recipes r
JOIN recipe_ingredients ri ON r.id = ri.recipe_id
JOIN ingredients i ON ri.ingredient_id = i.id
ORDER BY r.title, i.name;

CREATE VIEW user_pet_status AS
SELECT u.id AS user_id,
    u.username,
    p.name AS pet_name,
    p.hunger,
    p.happiness,
    p.level,
    p.exp,
    p.last_active
FROM users u
LEFT JOIN pets p ON u.id = p.user_id;

-- Display summary of what was created
SELECT 'Database Setup Complete!' as status;
SELECT 'Tables Created:' as info, COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public';
SELECT 'Users Added:' as info, COUNT(*) as count FROM users;
SELECT 'Ingredients Added:' as info, COUNT(*) as count FROM ingredients;
SELECT 'Recipes Added:' as info, COUNT(*) as count FROM recipes;
SELECT 'Recipe History Entries:' as info, COUNT(*) as count FROM recipe_history;
SELECT 'Pets Added:' as info, COUNT(*) as count FROM pets;