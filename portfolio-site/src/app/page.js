"use client";
import Link from "next/link";
import FoodSprites from "./components/foodsprites";

export default function Home() {
    return (
        <div className="relative isolate flex flex-col min-h-screen w-screen bg-gray-950">
            <FoodSprites
                count={100}
                areaClass="absolute inset-0 z-0 opacity-30"
            />

            {/* Hero Section with Dark Background */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-12">
                {/* Dark overlay gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black -z-10"></div>

                {/* Food Image Background Grid */}
                <div className="absolute inset-0 opacity-20 -z-5">
                    <div className="grid grid-cols-4 gap-4 p-8 h-full">
                        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop" alt="Fresh vegetables" className="w-full h-full object-cover rounded-lg" />
                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" alt="Salmon" className="w-full h-full object-cover rounded-lg" />
                        <img src="https://images.unsplash.com/photo-1495565111519-5f504fc6e9c1?w=400&h=400&fit=crop" alt="Fresh fruits" className="w-full h-full object-cover rounded-lg" />
                        <img src="https://images.unsplash.com/photo-1495664033076-1c2c8df6efd8?w=400&h=400&fit=crop" alt="Pasta" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>

                <div className="text-center max-w-3xl">
                    <span className="text-green-400 text-lg font-bold uppercase tracking-widest mb-4 block">
                        ♻️ Reduce. Cook. Thrive.
                    </span>
                    <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-tight">
                        Chaos <span className="text-green-400">Cooking</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Turn leftovers into amazing meals. Reduce waste. Cook smarter.
                    </p>

                    <Link
                        href="/ingredients"
                        className="inline-block mt-8 bg-green-500 hover:bg-green-400 text-gray-950 font-black py-4 px-12 rounded-full shadow-2xl transition-all transform hover:scale-110 text-lg"
                    >
                        Get Started →
                    </Link>

                    <p className="text-gray-400 mt-6 text-sm">
                        ✨ Join thousands reducing food waste, one meal at a time
                    </p>
                </div>
            </div>

            {/* How It Works Section - Dark Card Style */}
            <div className="relative z-10 w-full bg-gray-900 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                            How It <span className="text-green-400">Works</span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Three simple steps to turn your leftovers into amazing meals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-green-500 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-gray-800">
                            <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform">🥕</div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                1. Select Leftovers
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                Tell us what ingredients you have in your fridge. No waste, just endless possibilities waiting to be discovered.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-green-500 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-gray-800">
                            <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform">🍳</div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                2. Get Recipes
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                Discover creative recipes tailored to your ingredients. Quick, easy, and absolutely delicious every single time.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-green-500 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-gray-800">
                            <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform">♻️</div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                3. Save Waste
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                Track your impact, earn points, and help save the planet one meal at a time while having fun!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Recipes Showcase - Dark with Food Images */}
            <div className="relative z-10 w-full bg-gray-950 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                            Featured <span className="text-green-400">Creations</span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Inspiring recipes from our community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Recipe Card 1 */}
                        <div className="group bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-green-500 transition-all hover:shadow-2xl hover:scale-105">
                            <div className="h-48 overflow-hidden bg-gray-800 relative">
                                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop" alt="Stir fry" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                    Quick Veggie Stir-Fry
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Perfect for any leftover vegetables you have on hand
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-green-400 font-bold">⏱️ 15 min</span>
                                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                                </div>
                            </div>
                        </div>

                        {/* Recipe Card 2 */}
                        <div className="group bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-green-500 transition-all hover:shadow-2xl hover:scale-105">
                            <div className="h-48 overflow-hidden bg-gray-800 relative">
                                <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=300&fit=crop" alt="Pasta" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                    Leftover Pasta Bake
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Comfort food that uses up those pasta scraps
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-green-400 font-bold">⏱️ 25 min</span>
                                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                                </div>
                            </div>
                        </div>

                        {/* Recipe Card 3 */}
                        <div className="group bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-green-500 transition-all hover:shadow-2xl hover:scale-105">
                            <div className="h-48 overflow-hidden bg-gray-800 relative">
                                <img src="https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=300&fit=crop" alt="Salad" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                    Gourmet Grain Bowl
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Mix and match your leftover grains and veggies
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-green-400 font-bold">⏱️ 10 min</span>
                                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gamification Section - Dark Green Gradient */}
            <div className="relative z-10 w-full bg-gradient-to-br from-green-900 via-gray-900 to-gray-950 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                            🎮 Level Up Your Game
                        </h2>
                        <p className="text-lg text-green-100 max-w-2xl mx-auto">
                            Earn points, unlock achievements, and compete with friends while reducing food waste!
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                        {/* Achievement Badges */}
                        <div className="bg-gradient-to-br from-green-800 to-green-900 border border-green-700 rounded-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-110">
                            <div className="text-5xl mb-3">🍳</div>
                            <p className="text-white text-sm font-bold">First Recipe</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-800 to-green-900 border border-green-700 rounded-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-110">
                            <div className="text-5xl mb-3">👨‍🍳</div>
                            <p className="text-white text-sm font-bold">Chef in Training</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-800 to-green-900 border border-green-700 rounded-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-110">
                            <div className="text-5xl mb-3">🏆</div>
                            <p className="text-white text-sm font-bold">Home Chef</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-800 to-green-900 border border-green-700 rounded-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-110">
                            <div className="text-5xl mb-3">⭐</div>
                            <p className="text-white text-sm font-bold">Master Chef</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-800 to-green-900 border border-green-700 rounded-lg p-6 text-center hover:shadow-xl transition-all transform hover:scale-110">
                            <div className="text-5xl mb-3">♻️</div>
                            <p className="text-white text-sm font-bold">Waste Warrior</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/profile"
                            className="inline-block bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:bg-green-50"
                        >
                            View My Progress →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section - Dark Background */}
            <div className="relative z-10 w-full bg-gray-900 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-black text-center text-white mb-16">
                        Making an <span className="text-green-400">Impact</span> Together
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
                            <div className="text-6xl font-black text-green-400 mb-3">500+</div>
                            <p className="text-xl text-gray-300 font-semibold">Recipes Cooked</p>
                            <p className="text-gray-400 text-sm mt-2">This week by our community</p>
                        </div>
                        <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
                            <div className="text-6xl font-black text-green-400 mb-3">12K+</div>
                            <p className="text-xl text-gray-300 font-semibold">Ingredients Saved</p>
                            <p className="text-gray-400 text-sm mt-2">From the trash to the table</p>
                        </div>
                        <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
                            <div className="text-6xl font-black text-green-400 mb-3">1K+</div>
                            <p className="text-xl text-gray-300 font-semibold">Active Users</p>
                            <p className="text-gray-400 text-sm mt-2">Cooking with purpose</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="relative z-10 w-full bg-gradient-to-r from-green-600 to-green-700 py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                        Ready to Start Cooking?
                    </h2>
                    <p className="text-lg text-green-50 mb-10 leading-relaxed">
                        Join the movement to reduce food waste, one delicious recipe at a time. Your fridge (and the planet) will thank you.
                    </p>
                    <Link
                        href="/ingredients"
                        className="inline-block bg-white text-green-700 font-black py-4 px-12 rounded-full shadow-2xl transition-all transform hover:scale-110 text-lg hover:bg-green-50"
                    >
                        Start Cooking Now →
                    </Link>
                </div>
            </div>
        </div>
    );
}