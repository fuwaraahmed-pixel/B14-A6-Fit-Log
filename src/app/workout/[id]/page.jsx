"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useWorkout } from "../../context/WorkoutContext";

export default function WorkoutDetails() {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToPlan, saveForLater } = useWorkout();

    useEffect(() => {
        if (id) {
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
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-12">

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

                <div className="lg:w-1/2 flex flex-col">
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase mb-2">{workout.name}</h1>
                    <p className="text-gray-400 text-base mb-6">{workout.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {workout.muscleGroups?.map((tag, index) => (
                            <span key={index} className="bg-[#ccff00] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="bg-[#15171D] border border-[#222630] rounded-xl p-6 mb-8 text-sm">
                        <div className="flex justify-between items-center pb-4 border-b border-[#222630]">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Equipment</span>
                            <span className="font-semibold text-gray-300">{workout.equipment}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-[#222630]">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Difficulty</span>
                            <span className="font-semibold text-gray-300">{workout.difficulty}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-[#222630]">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Sets</span>
                            <span className="font-semibold text-gray-300">{workout.sets}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-[#222630]">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Reps</span>
                            <span className="font-semibold text-gray-300">{workout.reps}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-[#222630]">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Duration</span>
                            <span className="font-semibold text-gray-300">{workout.duration} min</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-[#222630]">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Calories</span>
                            <span className="font-semibold text-gray-300">{workout.caloriesBurned} kcal</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Rating</span>
                            <span className="font-semibold text-gray-300">{workout.rating}</span>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">Instructions</h3>
                        <ol className="list-decimal list-outside pl-4 space-y-4 text-gray-400 text-sm">
                            {workout.instructions?.map((step, index) => (
                                <li key={index} className="pl-2 leading-relaxed">{step}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-auto">
                        <button
                            onClick={() => addToPlan(workout)}
                            className="bg-[#ccff00] text-black font-bold text-sm px-5 py-2.5 rounded hover:bg-white transition-colors flex justify-center items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add to today's plan
                        </button>
                        <button
                            onClick={() => saveForLater(workout)}
                            className="border border-[#222630] bg-transparent text-gray-300 font-bold text-sm px-5 py-2.5 rounded hover:border-gray-500 transition-colors flex justify-center items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                            Save for later
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
