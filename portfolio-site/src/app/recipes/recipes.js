"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");

    // Mock data matching Mat's database structure
    const mockRecipes = [
        {
            id: 1,
            title: "Banana Bread Rescue",
            description: "Turn those brown bananas into TikTok-worthy banana bread! #NoBananaWaste",
            prep_time: 10,
            cook_time: 45,
            servings: 8,
            difficulty_level: "easy",
            created_by_username: "chloe_creates",
            ingredients: ["Browning Bananas", "Butter", "Flour", "Salt"]
        },
        {
            id: 2,
            title: "Leftover Chicken Fried Rice",
            description: "Quick 15-minute meal using yesterday's chicken and rice. Perfect after work!",
            prep_time: 5,
            cook_time: 10,
            servings: 2,
            difficulty_level: "easy",
            created_by_username: "marcus_busy",
            ingredients: ["Cooked Chicken", "Leftover Rice", "Hard-boiled Eggs", "Half Onion", "Sad Bell Peppers"]
        },
        {
            id: 3,
            title: "Chaos Smoothie Bowl",
            description: "Student budget hack: throw overripe fruits into a smoothie bowl! #ChaosCooking",
            prep_time: 5,
            cook_time: 0,
            servings: 1,
            difficulty_level: "easy",
            created_by_username: "emma_student",
            ingredients: ["Browning Bananas", "Overripe Berries", "Soft Apples", "Day-old Bread"]
        },
        {
            id: 4,
            title: "Leftover Veggie Scramble",
            description: "Use up those sad vegetables before they go bad. Gamified cooking!",
            prep_time: 8,
            cook_time: 12,
            servings: 2,
            difficulty_level: "easy",
            created_by_username: "marcus_busy",
            ingredients: ["Wilted Spinach", "Soft Carrots", "Sad Bell Peppers", "Leftover Mushrooms", "Hard-boiled Eggs"]
        },
        {
            id: 5,
            title: "Bread Pudding Hack",
            description: "Transform stale bread into dessert magic! Budget-friendly and aesthetic.",
            prep_time: 15,
            cook_time: 25,
            servings: 4,
            difficulty_level: "medium",
            created_by_username: "chloe_creates",
            ingredients: ["Day-old Bread", "Overripe Berries", "Hard-boiled Eggs", "Butter"]
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setRecipes(mockRecipes);
            setLoading(false);
        }, 500);
    }, []);

    // Filter recipes based on search and difficulty
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty_level === selectedDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "easy": return "bg-green-100 text-green-800";
            case "medium": return "bg-yellow-100 text-yellow-800";
            case "hard": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getTotalTime = (prep, cook) => {
        return prep + cook;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        Recipe Collection
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Browse our collection of leftover rescue recipes. Save food, save money!
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div className="flex justify-center gap-2">
                        {["all", "easy", "medium", "hard"].map((difficulty) => (
                            <button
                                key={difficulty}
                                onClick={() => setSelectedDifficulty(difficulty)}
                                className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${selectedDifficulty === difficulty
                                    ? "bg-green-500 text-white shadow-lg scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                                    }`}
                            >
                                {difficulty}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading recipes...</p>
                    </div>
                )}

                {/* Recipe Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {filteredRecipes.map((recipe) => (
                            <Link
                                key={recipe.id}
                                href={`/recipes/${recipe.id}`}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden"
                            >
                                {/* Recipe Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                    <span className="text-6xl">🍳</span>
                                </div>

                                {/* Recipe Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {recipe.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {recipe.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                ⏱️ {getTotalTime(recipe.prep_time, recipe.cook_time)} min
                                            </span>
                                            <span className="flex items-center gap-1">
                                                🍽️ {recipe.servings} servings
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex items-center justify-between">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(recipe.difficulty_level)}`}>
                                            {recipe.difficulty_level}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            by @{recipe.created_by_username}
                                        </span>
                                    </div>

                                    {/* Ingredients Preview */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 mb-2">Key ingredients:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                                                <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                                    {ingredient}
                                                </span>
                                            ))}
                                            {recipe.ingredients.length > 3 && (
                                                <span className="text-xs text-gray-500 px-2 py-1">
                                                    +{recipe.ingredients.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && filteredRecipes.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg mb-4">No recipes found matching your criteria</p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedDifficulty("all");
                            }}
                            className="text-green-600 hover:text-green-700 font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Results Count */}
                {!loading && filteredRecipes.length > 0 && (
                    <div className="text-center text-gray-600">
                        Showing {filteredRecipes.length} of {recipes.length} recipes
                    </div>
                )}
            </div>
        </div>
    );
}