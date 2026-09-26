"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-black text-white border-b border-gray-800">
            {/* বাম দিক - লোগো */}
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="FitLog Logo" width={32} height={32} />
                <span className="font-bold text-xl tracking-wider">FITLOG</span>
            </Link>

            {/* মাঝখান - লিংকস */}
            <div className="hidden md:flex items-center gap-8 font-semibold">
                <Link
                    href="/"
                    className={`${pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
                >
                    Workout
                </Link>
                <Link
                    href="/my-plan"
                    className={`${pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
                >
                    My Plan
                </Link>
            </div>

            {/* ডান দিক - ব্যাজ */}
            <div className="flex items-center gap-3">
                {/* Plan Badge */}
                <Link href="/my-plan">
                    <div className="flex items-center gap-2 bg-[#ccff00] text-black px-4 py-1.5 rounded-full font-bold text-sm">
                        <span>Plan</span>
                        <span className="bg-black text-[#ccff00] px-2 rounded-full text-xs py-0.5">0</span>
                    </div>
                </Link>

                {/* Saved Badge */}
                <Link href="/my-plan">
                    <div className="flex items-center gap-2 border-2 border-gray-500 text-white px-4 py-1.5 rounded-full font-bold text-sm">
                        <span>Saved</span>
                        <span className="bg-gray-800 px-2 rounded-full text-xs py-0.5">0</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}