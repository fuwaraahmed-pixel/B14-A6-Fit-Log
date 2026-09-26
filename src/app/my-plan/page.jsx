"use client";

import { useWorkout } from "../context/WorkoutContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MyPlanPage() {
    const { plannedWorkouts, savedWorkouts, removeFromPlan, removeFromSaved } = useWorkout();
    const [activeTab, setActiveTab] = useState("plan"); // "plan" বা "saved"
    const [sortBy, setSortBy] = useState("duration");

    // কোন ট্যাবে ক্লিক করা আছে তার উপর ভিত্তি করে ডেটা দেখানো
    const displayList = activeTab === "plan" ? plannedWorkouts : savedWorkouts;

    // Metrics calculation (অ্যাকটিভ ট্যাবের ডেটা দিয়ে হিসেব হবে)
    const totalExercises = displayList.length;
    const totalMinutes = displayList.reduce((total, item) => total + item.duration, 0);
    const totalCalories = displayList.reduce((total, item) => total + item.caloriesBurned, 0);


    // সর্ট (Sort) করার লজিক (বড় থেকে ছোট / Descending)
    const sortedList = [...displayList].sort((a, b) => {
        if (sortBy === "duration") return b.duration - a.duration;
        if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    return (
        <main className="container mx-auto px-4 md:px-8 py-10 max-w-5xl">

            {/* Header (বাম দিকে এলাইন করা) */}
            <div className="mb-8 text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide mb-2">My Plan</h1>
                <p className="text-gray-400 text-sm md:text-base">Cap of five lifts for today. Finish them, then load more.</p>
            </div>

            {/* Metrics Summary Row (ছবির মতো একটি বড় বক্স) */}
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 md:p-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 w-full md:border-r border-gray-800">
                    <p className="text-gray-500 text-xs font-semibold mb-2">Exercises</p>
                    <p className="text-4xl font-extrabold text-[#ccff00]">{totalExercises}</p>
                </div>
                <div className="flex-1 w-full md:border-r border-gray-800 md:pl-6">
                    <p className="text-gray-500 text-xs font-semibold mb-2">Minutes</p>
                    <p className="text-4xl font-extrabold">{totalMinutes}</p>
                </div>
                <div className="flex-1 w-full md:pl-6">
                    <p className="text-gray-500 text-xs font-semibold mb-2">Calories</p>
                    <p className="text-4xl font-extrabold">{totalCalories}</p>
                </div>
            </div>

            {/* Tabs and Sort By */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                {/* Tabs */}
                <div className="bg-[#1a1a1a] p-1 rounded-full flex">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === "plan" ? "bg-[#2a2a2a] text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        Today's Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === "saved" ? "bg-[#2a2a2a] text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        Saved
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Sort By</span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-[#111111] border border-gray-700 hover:border-gray-500 text-white pl-4 pr-8 py-2 rounded-full outline-none cursor-pointer appearance-none text-left min-w-[120px]"
                        >
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                        {/* Chevron Icon (▼) */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
                            ▼
                        </div>
                    </div>
                </div>
            </div>

            {/* Workout Cards List */}
            {sortedList.length === 0 ? (
                // Empty State
                <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-xl">
                    <h3 className="text-xl font-bold uppercase mb-2">Nothing here yet</h3>
                    <p className="text-gray-400 mb-6">Browse the library and add a lift to get today moving.</p>
                    <Link href="/" className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-white transition-colors">
                        Go to workouts
                    </Link>
                </div>
            ) : (
                // List of Cards
                <div className="space-y-4">
                    {sortedList.map(workout => (
                        <div key={workout.id} className="bg-[#111111] border border-gray-800 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">

                            {/* Thumbnail */}
                            <Image
                                src={workout.image}
                                alt={workout.name}
                                width={180}
                                height={100}
                                className="rounded-lg object-cover w-full md:w-[180px] h-[100px]"
                            />

                            {/* Details */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold uppercase mb-1">{workout.name}</h3>
                                <p className="text-gray-400 text-xs mb-3">{workout.equipment}</p>
                                <div className="flex justify-center md:justify-start gap-4 text-xs text-gray-300 font-medium">
                                    <span>⏱️ {workout.duration} min</span>
                                    <span>🔥 {workout.caloriesBurned} kcal</span>
                                    <span>⭐ {workout.rating}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                                <Link
                                    href={`/workout/${workout.id}`}
                                    className="px-4 py-2 rounded-full border border-gray-600 text-xs font-bold hover:border-white transition-colors"
                                >
                                    View Details
                                </Link>

                                <button
                                    onClick={() => toast.success("Marked as Done!")}
                                    className="px-4 py-2 rounded-full bg-[#ccff00] text-black text-xs font-bold flex items-center gap-2 hover:bg-white transition-colors"
                                >
                                    ✔ Mark as Done
                                </button>

                                <button
                                    onClick={() => activeTab === 'plan' ? removeFromPlan(workout.id) : removeFromSaved(workout.id)}
                                    className="p-2 text-gray-500 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </main>
    );
}
