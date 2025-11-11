"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useContext } from "react";
import { RecipeContext } from "../RecipeContext";

// Mascot logic
const MASCOT_SRC = {
    base: "/mascot/base.png",
    cheeky: "/mascot/cheeky.png",
    sad: "/mascot/sad.png",
};

const mascotVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
};

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTime, setSelectedTime] = useState("all");

    const [active, setActive] = useState(null);
    const [progress, setProgress] = useState({});

    const [mascotMood, setMascotMood] = useState("base");
    const { submittedRecipe } = useContext(RecipeContext);

    useEffect(() => {
        Object.values(MASCOT_SRC).forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // MASCOT TEMP DEV LOGIC
    const moods = ["base", "cheeky", "sad"];

    function cycleMood() {
        setMascotMood((prev) => {
            const idx = moods.indexOf(prev);
            return moods[(idx + 1) % moods.length];
        });
    }

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
            image: 'https://www.marthastewart.com/thmb/irpFSo-hGcKsW9AtP4ke5vJruGE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-1511453-vegan-banana-bread-3x2-52f60a63082147059df51459a98bbae6.jpg',
            ingredients: [
                { name: "Browning Bananas", quantity: 3, unit: "" },
                { name: "Butter", quantity: 100, unit: "g" },
                { name: "Flour", quantity: 250, unit: "g" },
                { name: "Salt", quantity: 0.5, unit: "tsp" },
            ],
            steps: [
                {
                    step: 1,
                    instruction: "Preheat your oven to 350°F (175°C). Grease a loaf pan.",
                    icon: "oven",
                },
                {
                    step: 2,
                    instruction: "In a bowl, mash the bananas until smooth.",
                    icon: "bowl",
                },
                {
                    step: 3,
                    instruction: "Mix in melted butter, sugar, egg, and vanilla extract.",
                    icon: "whisk",
                },
                {
                    step: 4,
                    instruction: "Add baking soda and salt. Stir in the flour last.",
                    icon: "mix",
                },
                {
                    step: 5,
                    instruction: "Pour the batter into the loaf pan and bake for 45 minutes.",
                    icon: "oven",
                },
                {
                    step: 6,
                    instruction: "Let it cool before slicing. Enjoy your banana bread!",
                    icon: "timer",
                },
            ]
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
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
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
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&h=300&fit=crop',
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
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
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
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
            ingredients: ["Day-old Bread", "Overripe Berries", "Hard-boiled Eggs", "Butter"]
        }
    ];

    // When we pull from API, we remap incoming data, structured here.
    function normalizeRecipe(r) {
        return {
            id: r.id,
            title: r.title ?? "Failed to load",
            description: r.description ?? "",
            prep_time: r.prep_time ?? 0,
            cook_time: r.cook_time ?? 0,
            servings: r.servings ?? 1,
            difficulty_level: r.difficulty_level ?? "easy",
            created_by_username: r.created_by_username ?? "unknown",
            image: r.image || r.image_url || "",
            ingredients: Array.isArray(r.ingredients)
                ? r.ingredients
                : (typeof r.ingredients === "string" ? r.ingredients.split("\n").filter(Boolean) : []),
            steps: Array.isArray(r.steps) ? r.steps : [],
        };
    }

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            let allRecipes = mockRecipes;
            if (submittedRecipe) {
                allRecipes = [submittedRecipe, ...mockRecipes];
            }
            setRecipes(allRecipes);
            setLoading(false);
        }, 500);
    }, [submittedRecipe]);

    // Helper function to get total time
    const getTotalTime = (prep, cook) => {
        return prep + cook;
    };

    // Filter recipes based on search and time
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());

        const totalTime = getTotalTime(recipe.prep_time, recipe.cook_time);
        const matchesTime = selectedTime === "all" ||
            (selectedTime === "quick" && totalTime <= 10) ||
            (selectedTime === "medium" && totalTime > 10 && totalTime <= 20) ||
            (selectedTime === "slow" && totalTime > 20);

        return matchesSearch && matchesTime;
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "easy": return "bg-green-100 text-green-800";
            case "medium": return "bg-yellow-100 text-yellow-800";
            case "hard": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    // Open recipe funcs:
    const onOpen = (recipe) => {
        setActive({ recipe, stepIndex: progress[recipe.id] ?? 0 });
    };

    const onClose = () => {
        setActive(null);
    };

    const onStep = (dir) => {
        setActive((s) => {
            if (!s) return s;
            const total = s.recipe.steps?.length ?? 0;
            const next = Math.min(Math.max(s.stepIndex + dir, 0), Math.max(total - 1, 0));
            setProgress((p) => ({ ...p, [s.recipe.id]: next }));
            return { ...s, stepIndex: next };
        });
    };


    // Lock the background when "modal/recipe" is open
    useEffect(() => {
        if (!active) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onStep(1);
            if (e.key === "ArrowLeft") onStep(-1);
            if (e.key === " ") {
                e.preventDefault();
                onStep(1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        }
    }, [active]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white from-40% to-green-200">
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
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none text-black"
                        />
                    </div>

                    {/* Time Filter */}
                    <div className="flex justify-center gap-2">
                        {[
                            { value: "all", label: "All" },
                            { value: "quick", label: "< 10 mins" },
                            { value: "medium", label: "10-20 mins" },
                            { value: "slow", label: "> 20 mins" }
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedTime(option.value)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedTime === option.value
                                    ? "bg-green-500 text-white shadow-lg scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                                    }`}
                            >
                                {option.label}
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
                            <motion.button
                                key={recipe.id}
                                layoutId={`recipe-${recipe.id}`}
                                onClick={() => onOpen(recipe)}
                                className="text-left bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-[1.02] overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 flex flex-col"
                            >
                                {recipe.image ? (
                                    <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover rounded-t-lg" />
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                        <span className="text-6xl">🍳</span>
                                    </div>
                                )}
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
                                            {(Array.isArray(recipe.ingredients) ? recipe.ingredients : recipe.ingredients.split('\n')).slice(0, 3).map((ingredient, idx) => {
                                                const item = typeof ingredient === "string" ? { name: ingredient } : ingredient;
                                                return (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
                                                    >
                                                        {item.name}
                                                    </span>
                                                );
                                            })}
                                            {recipe.ingredients.length > 3 && (
                                                <span className="text-xs text-gray-500 px-2 py-1">
                                                    +{recipe.ingredients.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
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
                                setSelectedTime("all");
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

            <AnimatePresence>
                {active && (
                    <>
                        <motion.div
                            onClick={onClose}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${active.recipe.title} tutorial`}
                            layoutId={`recipe-${active.recipe.id}`}
                            className="fixed inset-4 md:inset-8 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                            initial={{ opacity: 0.9, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.9, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                        >
                            <div className="relative">
                                <div className="h-40 md:h-56 relative flex items-end justify-center overflow-hidden rounded-t-2xl">
                                    <img
                                        src="https://cdn.midjourney.com/89ed6fe2-e1a1-4dbd-be65-6522aaaae509/0_3.png"
                                        alt="Kitchen background"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.img
                                            key={MASCOT_SRC[mascotMood] || MASCOT_SRC.base}
                                            src={MASCOT_SRC[mascotMood] || MASCOT_SRC.base}
                                            alt={`Chaos Cooking mascot - ${mascotMood}`}
                                            className="h-full z-50"
                                            variants={mascotVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.28, ease: "easeOut" }}
                                        />
                                    </AnimatePresence>
                                    {/* Dev mood cycle button */}
                                    <button
                                        onClick={cycleMood}
                                        className="z-[9999] bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
                                    >
                                        Cycle Mood ({mascotMood})
                                    </button>

                                </div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/60 text-white px-3 py-2 text-sm hover:bg-black/70"
                                >
                                    <FaTimes className="w-4 h-4" />
                                    <span>Esc</span>
                                </button>
                            </div>


                            <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <aside className="md:col-span-1 space-y-2 bg-stone-100 p-4 rounded-lg">
                                    <div className="w-full rounded-2xl">
                                        <img src={active.recipe.image} alt="" className="rounded-lg h-48 w-full object-cover" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mt-4">
                                            {active.recipe.title}
                                        </h2>
                                        <p className="text-gray-600 mt-2 text-sm">{active.recipe.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                                        <div className="rounded-lg bg-stone-500 p-3">
                                            <div className="text-gray-200">Total time</div>
                                            <div className="font-semibold">
                                                {getTotalTime(active.recipe.prep_time, active.recipe.cook_time)} min
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-stone-500 p-3">
                                            <div className="text-gray-200">Servings</div>
                                            <div className="font-semibold">{active.recipe.servings}</div>
                                        </div>
                                    </div>
                                    <h3 className="text-black font-semibold text-xl mt-4">Ingredients</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {active.recipe.ingredients.map((ing, i) => {
                                            const ingredient = typeof ing === "string" ? { name: ing } : ing;
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 bg-neutral-200 rounded-lg w-full p-2"
                                                >
                                                    <div className="bg-neutral-400 flex items-center justify-center rounded-lg h-10 w-10 shrink-0">
                                                        <img
                                                            src={ingredient.icon ? `/icons/${ingredient.icon}.svg` : null}
                                                            alt=""
                                                            className="w-5 h-5"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col leading-tight">
                                                        <span className="text-gray-500 text-xs">
                                                            {ingredient.quantity && ingredient.unit
                                                                ? `${ingredient.quantity}${ingredient.unit}`
                                                                : ingredient.quantity
                                                                    ? ingredient.quantity
                                                                    : "—"}
                                                        </span>
                                                        <span className="text-black font-medium">{ingredient.name}</span>
                                                        {ingredient.prep && (
                                                            <span className="text-gray-500 text-xs">{ingredient.prep}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </aside>

                                <section className="md:col-span-2 flex flex-col">
                                    <StepProgress
                                        current={active.stepIndex}
                                        total={active.recipe.steps?.length ?? 0}
                                    />

                                    <div className="mt-4 md:mt-6 flex-1">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={active.stepIndex}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.18 }}
                                                className="prose prose-sm md:prose base:text-gray-800 max-w-none"
                                            >
                                                {(() => {
                                                    const stepObj = active.recipe.steps?.[active.stepIndex];
                                                    if (!stepObj) {
                                                        return <p className="text-gray-700">No steps provided.</p>;
                                                    }
                                                    return (
                                                        <>
                                                            <div className="flex items-center gap-3">
                                                                <StepIcon name={stepObj.icon} />
                                                                <h4 className="text-gray-900 font-semibold">
                                                                    Step {stepObj.step ?? active.stepIndex + 1}
                                                                </h4>
                                                            </div>
                                                            <p className="mt-2 text-gray-700 leading-relaxed">
                                                                {stepObj.instruction}
                                                            </p>
                                                        </>
                                                    );
                                                })()}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between gap-2">
                                        <button
                                            onClick={() => onStep(-1)}
                                            disabled={active.stepIndex === 0}
                                            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
                                        >
                                            <FaChevronLeft className="w-4 h-4" />
                                            Prev
                                        </button>
                                        <div className="text-xs text-gray-500">Tip: use ← / → or Space</div>
                                        <button
                                            onClick={() => onStep(1)}
                                            disabled={
                                                active.stepIndex >= (active.recipe.steps?.length ?? 1) - 1
                                            }
                                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700 disabled:opacity-50"
                                        >
                                            Next
                                            <FaChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}

function StepProgress({ current, total }) {
    const pct = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                    {total ? `${current + 1} / ${total} steps` : "No steps"}
                </span>
                <span className="text-xs text-gray-500">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <motion.div
                    className="h-full bg-green-600"
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                />
            </div>
        </div>
    );
}

function StepIcon({ name }) {
    const emoji = {
        oven: "🔥",
        bowl: "🥣",
        whisk: "🌀",
        mix: "🥄",
        stove: "🍳",
        knife: "🔪",
        pan: "🍳",
        timer: "⏲️",
    }[name] ?? "🍽️";

    return (
        <span
            aria-label={name}
            className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-lg"
            title={name}
        >
            {emoji}
        </span>
    );
}