"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Analyze", href: "/analyze" },
        { name: "Help", href: "/help" },
    ];

    return (
        <nav className="flex items-center justify-between bg-white border border-gray-100 rounded-full shadow-sm px-6 py-3 mt-4 mx-auto max-w-5xl">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
                <Image
                    src="/642c5f0b-93b2-41df-985f-6944d4745f5e.png"
                    alt="FinScope Logo"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <span className="text-[#032D60] font-semibold text-lg">FinScope</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`text-sm font-medium transition-all ${pathname === link.href
                                ? "bg-[#032D60] text-white px-3 py-1.5 rounded-full"
                                : "text-[#032D60] hover:text-[#021E40]"
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}