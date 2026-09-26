"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
    const [plannedWorkouts, setPlannedWorkouts] = useState([]);
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const localPlan = localStorage.getItem("plannedWorkouts");
        const localSaved = localStorage.getItem("savedWorkouts");

        if (localPlan) setPlannedWorkouts(JSON.parse(localPlan));
        if (localSaved) setSavedWorkouts(JSON.parse(localSaved));

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("plannedWorkouts", JSON.stringify(plannedWorkouts));
            localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
        }
    }, [plannedWorkouts, savedWorkouts, isLoaded]);

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

    const saveForLater = (workout) => {
        const isAlreadySaved = savedWorkouts.find(w => w.id === workout.id);
        if (isAlreadySaved) {
            toast.error("Already saved for later!");
            return;
        }

        setSavedWorkouts([...savedWorkouts, workout]);
        toast.success("Saved for later");
    };

    const removeFromPlan = (id) => {
        setPlannedWorkouts(plannedWorkouts.filter(w => w.id !== id));
        toast.success("Removed from plan");
    };

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
