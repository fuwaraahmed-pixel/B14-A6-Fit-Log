export default function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-[#0a0a0a] py-8 mt-20">
            <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                
                <div className="flex items-center gap-2">
                    <span className="text-[#ccff00] text-2xl font-bold">🏋️</span>
                    <span className="font-bold text-lg tracking-wider text-white uppercase">FitLog</span>
                </div>

                
                <p className="text-gray-500 text-sm text-center md:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
}
