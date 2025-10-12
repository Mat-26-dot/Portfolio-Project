"use client";
import Link from "next/link";
import FoodSprites from "./components/foodsprites";

export default function Home() {
return (
<div className="relative isolate flex flex-col min-h-screen w-screen">
<FoodSprites
count={100}
areaClass="absolute inset-0 z-0"
/>

{/* content always above food sprites on z-index */}
<div className="relative z-10 max-w-3xl mx-auto mt-48 flex text-center flex-col">
<span className="text-neutral-700 font-bold text-8xl px-2 py-4 bg-gradient-to-r from-lime-100 to-green-100 rounded-lg">
Chaos Cooking
</span>
<p className="text-neutral-600 mt-4 text-xl max-w-[600px] mx-auto">
Transform your leftovers into delicious meals and reduce food waste! 
Select your ingredients and discover creative recipes.
</p>

<Link 
href="/ingredients"
className="inline-block mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
>
Get Started →
</Link>
</div>

<div className="relative z-10 w-[80%] h-[100vh] bg-green-200 mx-auto mt-24 rounded-t-3xl"></div>
</div>
);
}
