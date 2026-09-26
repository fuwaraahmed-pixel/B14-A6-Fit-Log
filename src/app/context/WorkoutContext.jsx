"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
    const [plannedWorkouts, setPlannedWorkouts] = useState([]);
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // পেজ রিলোড দিলে যেন ডেটা মুছে না যায়, তাই localStorage থেকে ডেটা নিয়ে আসছি
    useEffect(() => {
        const localPlan = localStorage.getItem("plannedWorkouts");
        const localSaved = localStorage.getItem("savedWorkouts");

        if (localPlan) setPlannedWorkouts(JSON.parse(localPlan));
        if (localSaved) setSavedWorkouts(JSON.parse(localSaved));

        setIsLoaded(true);
    }, []);

    // যখনই ডেটা চেঞ্জ হবে, তখন localStorage আপডেট হবে
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("plannedWorkouts", JSON.stringify(plannedWorkouts));
            localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
        }
    }, [plannedWorkouts, savedWorkouts, isLoaded]);

    // Plan এ অ্যাড করার ফাংশন
    const addToPlan = (workout) => {
        if (plannedWorkouts.length >= 5) {
            toast.error("You can only add up to 5 lifts for today!");
            return;
        }

        const isAlreadyPlanned = plannedWorkouts.find(w => w.id === workout.id);
        if (isAlreadyPlanned) {
            toast.error("Already in today's plan!");
            return;
        }

        setPlannedWorkouts([...plannedWorkouts, workout]);
        toast.success("Added to today's plan");
    };

    // Saved এ অ্যাড করার ফাংশন
    const saveForLater = (workout) => {
        const isAlreadySaved = savedWorkouts.find(w => w.id === workout.id);
        if (isAlreadySaved) {
            toast.error("Already saved for later!");
            return;
        }

        setSavedWorkouts([...savedWorkouts, workout]);
        toast.success("Saved for later");
    };

    // Plan থেকে রিমুভ করার ফাংশন
    const removeFromPlan = (id) => {
        setPlannedWorkouts(plannedWorkouts.filter(w => w.id !== id));
        toast.success("Removed from plan");
    };

    // Saved থেকে রিমুভ করার ফাংশন
    const removeFromSaved = (id) => {
        setSavedWorkouts(savedWorkouts.filter(w => w.id !== id));
        toast.success("Removed from saved list");
    };

    return (
        <WorkoutContext.Provider value={{
            plannedWorkouts,
            savedWorkouts,
            addToPlan,
            saveForLater,
            removeFromPlan,
            removeFromSaved
        }}>
            {children}
        </WorkoutContext.Provider>
    );
}

export function useWorkout() {
    return useContext(WorkoutContext);
}
