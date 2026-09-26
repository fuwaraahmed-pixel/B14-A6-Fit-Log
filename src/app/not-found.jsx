import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 mt-20">
      <h1 className="text-8xl font-extrabold text-[#ccff00] mb-4">404</h1>
      <h2 className="text-3xl font-bold uppercase mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="bg-[#ccff00] text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
