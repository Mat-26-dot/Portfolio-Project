"use client";
import { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { RecipeContext } from "../RecipeContext";

export default function SubmitRecipePage() {
    const [formData, setFormData] = useState({
        title: "Leftover Pasta Bake",
        description: "Transform yesterday's pasta into a cheesy, delicious baked goodness. Perfect comfort food that saves leftovers!",
        ingredients: "2 cups leftover pasta\n1 cup cheese\n2 eggs\n1/2 cup milk\nSalt and pepper to taste",
        instructions: "1. Preheat oven to 350°F\n2. Mix pasta with eggs and milk\n3. Pour into baking dish and top with cheese\n4. Bake for 20 minutes until golden\n5. Let cool for 2 minutes and serve",
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        difficulty: "easy"
    });

    const [submitted, setSubmitted] = useState(false);
    const [recipeImage, setRecipeImage] = useState("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop");
    const { setSubmittedRecipe } = useContext(RecipeContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "servings" || name === "prepTime" || name === "cookTime" ? parseInt(value) : value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setRecipeImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save recipe to context
        setSubmittedRecipe({
            id: 999,
            ...formData,
            image: recipeImage,
            created_by_username: "chloe_creates",
            difficulty_level: formData.difficulty,
            prep_time: formData.prepTime,
            cook_time: formData.cookTime,
        });

        setSubmitted(true);
        setTimeout(() => {
            setFormData({
                title: "Leftover Pasta Bake",
                description: "Transform yesterday's pasta into a cheesy, delicious baked goodness. Perfect comfort food that saves leftovers!",
                ingredients: "2 cups leftover pasta\n1 cup cheese\n2 eggs\n1/2 cup milk\nSalt and pepper to taste",
                instructions: "1. Preheat oven to 350°F\n2. Mix pasta with eggs and milk\n3. Pour into baking dish and top with cheese\n4. Bake for 20 minutes until golden\n5. Let cool for 2 minutes and serve",
                prepTime: 10,
                cookTime: 20,
                servings: 4,
                difficulty: "easy"
            });
            setSubmitted(false);
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="text-8xl mb-6">🎉</div>
                    <h1 className="text-4xl font-bold text-green-600 mb-3">
                        Recipe Submitted!
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for sharing your chaos cooking recipe with our community!
                    </p>
                    <Link
                        href="/recipes"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full"
                    >
                        View All Recipes →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
                    Share Your Recipe
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Have an amazing leftover rescue recipe? Share it with the Chaos Cooking community!
                </p>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">
                            Recipe Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Leftover Pasta Bake"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your recipe in a few sentences..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 h-24"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">
                            Recipe Photo (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {recipeImage ? (
                                <div>
                                    <img
                                        src={recipeImage}
                                        alt="Recipe preview"
                                        className="max-h-48 mx-auto mb-3 rounded-lg"
                                    />
                                    <p className="text-green-600 font-semibold">✓ Image selected</p>
                                    <p className="text-sm text-gray-500 mt-1">Click to change</p>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-4xl mb-2">📸</div>
                                    <p className="text-gray-600 font-semibold">Click to upload a photo</p>
                                    <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">
                            Ingredients *
                        </label>
                        <textarea
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            placeholder="List each ingredient on a new line"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 h-28"
                            required
                        />
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">
                            Instructions *
                        </label>
                        <textarea
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            placeholder="Step-by-step cooking instructions..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 h-28"
                            required
                        />
                    </div>

                    {/* Cooking Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                Prep Time (mins)
                            </label>
                            <input
                                type="number"
                                name="prepTime"
                                value={formData.prepTime}
                                onChange={handleChange}
                                placeholder="e.g., 10"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                Cook Time (mins)
                            </label>
                            <input
                                type="number"
                                name="cookTime"
                                value={formData.cookTime}
                                onChange={handleChange}
                                placeholder="e.g., 20"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                    </div>

                    {/* Servings & Difficulty */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                Servings
                            </label>
                            <input
                                type="number"
                                name="servings"
                                value={formData.servings}
                                onChange={handleChange}
                                placeholder="e.g., 4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                Difficulty Level
                            </label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                    >
                        Submit Recipe 🚀
                    </button>
                </form>

                {/* Back Link */}
                <div className="text-center mt-6">
                    <Link href="/recipes" className="text-green-600 hover:text-green-700 font-semibold">
                        ← Back to Recipes
                    </Link>
                </div>
            </div>
        </div>
    );
}
