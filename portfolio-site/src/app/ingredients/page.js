"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function IngredientsPage() {
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "All" },
    { id: "leftover_protein", name: "Proteins" },
    { id: "leftover_vegetable", name: "Vegetables" },
    { id: "leftover_fruit", name: "Fruits" },
    { id: "leftover_starch", name: "Starches" },
    { id: "pantry", name: "Pantry" },
  ];

  const mockIngredients = [
    { id: 1, name: "Cooked Chicken", category: "leftover_protein" },
    { id: 2, name: "Leftover Turkey", category: "leftover_protein" },
    { id: 3, name: "Hard-boiled Eggs", category: "leftover_protein" },
    { id: 7, name: "Wilted Spinach", category: "leftover_vegetable" },
    { id: 8, name: "Soft Carrots", category: "leftover_vegetable" },
    { id: 9, name: "Leftover Broccoli", category: "leftover_vegetable" },
    { id: 16, name: "Browning Bananas", category: "leftover_fruit" },
    { id: 17, name: "Overripe Berries", category: "leftover_fruit" },
    { id: 20, name: "Day-old Bread", category: "leftover_starch" },
    { id: 21, name: "Leftover Rice", category: "leftover_starch" },
    { id: 25, name: "Salt", category: "pantry" },
    { id: 28, name: "Cheese", category: "pantry" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setAllIngredients(mockIngredients);
      setLoading(false);
    }, 500);
  }, []);

  const filteredIngredients = selectedCategory === "all" ? allIngredients : allIngredients.filter((ing) => ing.category === selectedCategory);

  const toggleIngredient = (ingredientId) => {
    if (selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients(selectedIngredients.filter((id) => id !== ingredientId));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientId]);
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = { leftover_protein: "🍗", leftover_vegetable: "🥕", leftover_fruit: "🍌", leftover_starch: "🍞", pantry: "🧂" };
    return emojis[category] || "🍽️";
  };

  const formatCategory = (category) => {
    return category.replace("leftover_", "").replace("_", " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700">← Chaos Cooking</Link>
            <div className="text-sm text-gray-600">Selected: <span className="font-bold text-green-600">{selectedIngredients.length}</span></div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">What's in Your Fridge?</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Select your leftover ingredients and we'll find recipes to prevent food waste!</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === cat.id ? "bg-green-500 text-white shadow-lg scale-105" : "bg-white text-gray-700 hover:bg-gray-100 shadow"}`}>{cat.name}</button>
          ))}
        </div>
        {loading && (<div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div><p className="text-gray-600 mt-4">Loading ingredients...</p></div>)}
        {!loading && (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">{filteredIngredients.map((ingredient) => { const isSelected = selectedIngredients.includes(ingredient.id); return (<button key={ingredient.id} onClick={() => toggleIngredient(ingredient.id)} className={`relative p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${isSelected ? "border-green-500 bg-green-50 shadow-lg" : "border-gray-200 bg-white hover:border-green-300"}`}>{isSelected && (<div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">✓</div>)}<div className="text-4xl mb-2 text-center">{getCategoryEmoji(ingredient.category)}</div><h3 className="font-medium text-gray-800 text-center text-sm">{ingredient.name}</h3><div className="mt-2 text-xs text-gray-500 text-center">{formatCategory(ingredient.category)}</div></button>); })}</div>)}
        {!loading && filteredIngredients.length === 0 && (<div className="text-center py-12"><p className="text-gray-600 text-lg">No ingredients found in this category.</p></div>)}
        {selectedIngredients.length > 0 && (<div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4"><div className="max-w-7xl mx-auto flex justify-between items-center"><div><p className="text-sm text-gray-600">{selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? "s" : ""} selected</p></div><Link href={`/recipes?ingredients=${selectedIngredients.join(",")}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105">Find Recipes →</Link></div></div>)}
      </div>
    </div>
  );
}
