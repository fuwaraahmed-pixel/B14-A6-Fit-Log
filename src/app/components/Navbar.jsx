"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "../context/WorkoutContext";

export default function Navbar() {
    const pathname = usePathname();
    const { plannedWorkouts, savedWorkouts } = useWorkout();

    return (
        <nav className="flex flex-wrap items-center justify-between px-4 md:px-8 py-4 bg-black text-white border-b border-gray-800 gap-y-4">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="FitLog Logo" width={32} height={32} />
                <span className="font-bold text-xl tracking-wider">FITLOG</span>
            </Link>

            <div className="flex items-center gap-4 md:gap-8 font-semibold text-sm md:text-base mt-2 sm:mt-0 order-last sm:order-none w-full sm:w-auto justify-center">
                <Link href="/" className={`${pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}>
                    Workout
                </Link>
                <Link href="/my-plan" className={`${pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}>
                    My Plan
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <Link href="/my-plan">
                    <div className="flex items-center gap-2 bg-[#ccff00] text-black px-4 py-1.5 rounded-full font-bold text-sm">
                        <span>Plan</span>
                        <span className="bg-black text-[#ccff00] px-2 rounded-full text-xs py-0.5">
                            {plannedWorkouts.length}
                        </span>
                    </div>
                </Link>

                <Link href="/my-plan">
                    <div className="flex items-center gap-2 border-2 border-gray-500 text-white px-4 py-1.5 rounded-full font-bold text-sm">
                        <span>Saved</span>
                        <span className="bg-gray-800 px-2 rounded-full text-xs py-0.5">
                            {savedWorkouts.length}
                        </span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
