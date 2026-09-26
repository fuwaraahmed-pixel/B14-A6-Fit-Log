import Image from "next/image";
import Link from "next/link";
import WorkoutLibrary from "./components/WorkoutLibrary";


export default function Home() {
  return (
    <main className="container mx-auto px-4 md:px-8 py-6">

      {/* Hero / Banner Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 mt-4 md:mt-8 bg-[#15171D] border border-[#222630] rounded-2xl p-8 md:px-16 md:py-8">


        <div className="flex-1 space-y-6">
          <p className="text-[#ccff00] font-bold tracking-widest text-sm uppercase">
            Workout Library
          </p>

          <h1 className="text-5xl md:text-5xl font-extrabold uppercase leading-tight tracking-wide">
            Train with intent. <br /> Log every set.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-lg px-8 py-4 rounded hover:bg-white transition-colors"
          >
            BROWSE WORKOUTS
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </Link>
        </div>

        <div className="flex-1 w-full flex justify-end">
          <Image
            src="/banner.png"
            alt="Hero Banner"
            width={334}
            height={334}
            className="w-full max-w-[250px] md:max-w-[334px] h-auto object-contain"
            priority
          />
        </div>
      </section>

      <section id="library" className="mt-16">
        <h2 className="text-4xl font-extrabold mb-2 uppercase">THE LIBRARY</h2>
        <p className="text-gray-400 text-lg">Twelve lifts covering every major muscle group.</p>
        <WorkoutLibrary />
      </section>

    </main>
  );
}
