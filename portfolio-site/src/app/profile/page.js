"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock user data matching Mat's backend structure
    const mockUserData = {
        user_id: 1,
        username: "chloe_creates",
        points: 70,
        recipes_cooked: 7,
        ingredients_saved: 15,
        achievements: [
            { name: "First Recipe", threshold: 1, unlocked: true, emoji: "🍳" },
            { name: "Chef in Training", threshold: 5, unlocked: true, emoji: "👨‍🍳" },
            { name: "Home Chef", threshold: 10, unlocked: false, emoji: "🏠" },
            { name: "Master Chef", threshold: 25, unlocked: false, emoji: "⭐" },
            { name: "Waste Warrior", threshold: 50, unlocked: false, emoji: "♻️" }
        ]
    };

    useEffect(() => {
        // Simulate API call to Mat's backend
        setTimeout(() => {
            setUserData(mockUserData);
            setLoading(false);
        }, 500);
    }, []);

    const handleShare = () => {
        const message = `I've saved ${userData.ingredients_saved} ingredients from waste by cooking ${userData.recipes_cooked} recipes with Chaos Cooking! 🍳♻️`;

        // Try native share API first
        if (navigator.share) {
            navigator.share({
                title: "My Chaos Cooking Stats",
                text: message,
                url: window.location.origin
            }).catch(() => {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(message);
                alert("Stats copied to clipboard!");
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(message);
            alert("Stats copied to clipboard!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading your profile...</p>
                </div>
            </div>
        );
    }

    const nextAchievement = userData.achievements.find(a => !a.unlocked);
    const recipesUntilNext = nextAchievement ? nextAchievement.threshold - userData.recipes_cooked : 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                        <span className="text-6xl">👤</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        @{userData.username}
                    </h1>
                    <p className="text-gray-600">Your Chaos Cooking Journey</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Points */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all">
                        <div className="text-5xl mb-3">🏆</div>
                        <div className="text-4xl font-bold text-green-600 mb-2">
                            {userData.points}
                        </div>
                        <div className="text-gray-600 font-medium">Total Points</div>
                        <div className="text-xs text-gray-500 mt-2">
                            10 points per recipe cooked
                        </div>
                    </div>

                    {/* Recipes Cooked */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all">
                        <div className="text-5xl mb-3">🍳</div>
                        <div className="text-4xl font-bold text-green-600 mb-2">
                            {userData.recipes_cooked}
                        </div>
                        <div className="text-gray-600 font-medium">Recipes Cooked</div>
                        <div className="text-xs text-gray-500 mt-2">
                            Keep cooking to earn more!
                        </div>
                    </div>

                    {/* Ingredients Saved */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all">
                        <div className="text-5xl mb-3">♻️</div>
                        <div className="text-4xl font-bold text-green-600 mb-2">
                            {userData.ingredients_saved}
                        </div>
                        <div className="text-gray-600 font-medium">Ingredients Saved</div>
                        <div className="text-xs text-gray-500 mt-2">
                            Helping reduce food waste!
                        </div>
                    </div>
                </div>

                {/* Progress to Next Achievement */}
                {nextAchievement && (
                    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg p-6 mb-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Next Achievement</h3>
                                <p className="text-lg opacity-90">
                                    {nextAchievement.emoji} {nextAchievement.name}
                                </p>
                                <p className="text-sm opacity-75 mt-1">
                                    Cook {recipesUntilNext} more {recipesUntilNext === 1 ? 'recipe' : 'recipes'} to unlock!
                                </p>
                            </div>
                            <div className="text-6xl">{nextAchievement.emoji}</div>
                        </div>
                        <div className="mt-4">
                            <div className="bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-white h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(userData.recipes_cooked / nextAchievement.threshold) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-center mt-2 opacity-75">
                                {userData.recipes_cooked} / {nextAchievement.threshold} recipes
                            </p>
                        </div>
                    </div>
                )}

                {/* Achievements Grid */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        🏅 Achievements
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {userData.achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className={`text-center p-4 rounded-lg border-2 transition-all ${achievement.unlocked
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 bg-gray-50 opacity-50"
                                    }`}
                            >
                                <div className="text-5xl mb-2">
                                    {achievement.unlocked ? achievement.emoji : "🔒"}
                                </div>
                                <h3 className="font-bold text-sm text-gray-800 mb-1">
                                    {achievement.name}
                                </h3>
                                <p className="text-xs text-gray-600">
                                    {achievement.threshold} {achievement.threshold === 1 ? 'recipe' : 'recipes'}
                                </p>
                                {achievement.unlocked && (
                                    <div className="mt-2">
                                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                            ✓ Unlocked
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Virtual Pet Placeholder */}
                <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-lg p-8 mb-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">🐾 Your Cooking Companion</h2>
                    <Image
                        src="/mascot-happy.png"
                        alt="Happy cooking companion"
                        width={120}
                        height={100}
                        className="mx-auto mb-4"
                    />
                    <p className="text-2xl font-bold mb-2">Your pet is happy!</p>
                    <p className="text-sm opacity-90 mb-4">
                        Keep cooking to maintain your streak and keep your companion happy!
                    </p>

                </div>

                {/* Social Share Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        📢 Share Your Progress
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Show off your food waste reduction achievements!
                    </p>

                    <button
                        onClick={handleShare}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
                    >
                        Share My Stats 🚀
                    </button>
                </div>



            </div>
        </div>
    );
}