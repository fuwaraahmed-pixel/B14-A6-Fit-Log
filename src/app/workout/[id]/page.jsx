"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function WorkoutDetails() {
    const { id } = useParams(); // URL থেকে id নিবে
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // সিঙ্গেল ডেটা আনার API
            fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkout(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching details:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    // Loading Animation
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ccff00]"></div>
            </div>
        );
    }

    if (!workout) {
        return <div className="text-center mt-20 text-2xl">Workout not found!</div>;
    }

    return (
        <main className="container mx-auto px-4 md:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-12 mt-10">

                {/* Left Side — Visual/Media */}
                <div className="lg:w-1/2">
                    <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden border-2 border-gray-800">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Right Side — details */}
                <div className="lg:w-1/2 flex flex-col">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {workout.muscleGroups?.map((tag, index) => (
                            <span key={index} className="bg-black border border-gray-700 text-xs font-bold px-4 py-1.5 rounded-full text-gray-300 uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase mb-4">{workout.name}</h1>
                    <p className="text-gray-400 text-lg mb-8">{workout.description}</p>

                    {/* Key Specs table */}
                    <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 mb-8 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Equipment</p>
                            <p className="font-semibold">{workout.equipment}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Difficulty</p>
                            <p className="font-semibold">{workout.difficulty}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Sets / Reps</p>
                            <p className="font-semibold">{workout.sets} / {workout.reps}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Duration</p>
                            <p className="font-semibold">{workout.duration} min</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Calories</p>
                            <p className="font-semibold">{workout.caloriesBurned} kcal</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Rating</p>
                            <p className="font-semibold text-[#ccff00]">⭐ {workout.rating}</p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold uppercase mb-4">Instructions</h3>
                        <ol className="list-decimal list-inside space-y-3 text-gray-300">
                            {workout.instructions?.map((step, index) => (
                                <li key={index} className="pl-2">{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Call-to-action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <button className="flex-1 bg-[#ccff00] text-black font-bold text-lg px-6 py-4 rounded hover:bg-white transition-colors flex justify-center items-center gap-2">
                            <span>➕</span> Add to today's plan
                        </button>
                        <button className="flex-1 border-2 border-gray-600 text-white font-bold text-lg px-6 py-4 rounded hover:border-white transition-colors flex justify-center items-center gap-2">
                            <span>🔖</span> Save for later
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
