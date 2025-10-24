import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const currentPath = router.pathname;

  // Function to determine classes
  const linkClass = (path) =>
    currentPath === path
      ? "px-4 py-2 rounded-full bg-blue-900 text-white hover:bg-blue-800 transition"
      : "text-gray-700 hover:text-blue-800 transition";

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 
      w-[calc(100%-20px)] px-8 py-4 
      flex items-center justify-between
      bg-white/30 backdrop-blur-lg border border-white/20 
      rounded-full shadow-md transition">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="FinScope Logo" className="w-10 h-auto" />
        <span className="text-xl font-semibold text-gray-800">FinScope</span>
      </div>

      {/* Links */}
      <ul className="flex items-center space-x-6 font-medium">
        <li>
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/Analyze2" className={linkClass("/Analyze2")}>
            Analyze
          </Link>
        </li>
        <li>
          <Link href="/Help" className={linkClass("/Help")}>
            Help
          </Link>
        </li>
      </ul>
    </nav>
  );
}
