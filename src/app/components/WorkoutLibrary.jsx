"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WorkoutLibrary() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API থেকে ডেটা নিয়ে আসা হচ্ছে
        fetch("https://api.abcz.workers.dev/api/fitlog")
            .then((res) => res.json())
            .then((data) => {
                setWorkouts(data);
                setLoading(false); // ডেটা চলে আসলে লোডিং বন্ধ হবে
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    // ডেটা লোড হওয়ার সময় এই অ্যানিমেশনটি দেখাবে
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ccff00]"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {workouts.map((workout) => (
                <Link href={`/workout/${workout.id}`} key={workout.id}>
                    <div className="bg-[#111111] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#ccff00] transition-all cursor-pointer h-full flex flex-col border border-gray-800 hover:border-[#ccff00]">
                        {/* ছবির অংশ */}
                        <div className="relative h-60 w-full">
                            <Image
                                src={workout.image}
                                alt={workout.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* বিস্তারিত অংশ */}
                        <div className="p-6 flex flex-col flex-1">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {workout.muscleGroups.map((tag, index) => (
                                    <span key={index} className="bg-black border border-gray-700 text-[10px] font-bold px-3 py-1 rounded-full text-gray-300 uppercase tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title & Equipment */}
                            <h3 className="text-xl font-bold uppercase mb-1">{workout.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 flex-1">{workout.equipment}</p>

                            {/* Stats Row */}
                            <div className="flex items-center justify-between border-t border-gray-800 pt-4 mt-auto">
                                <div className="flex items-center gap-1.5 text-gray-300 text-sm font-medium">
                                    <span>⏱️</span> {workout.duration} min
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-300 text-sm font-medium">
                                    <span>🔥</span> {workout.caloriesBurned} kcal
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-300 text-sm font-medium">
                                    <span>⭐</span> {workout.rating}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
