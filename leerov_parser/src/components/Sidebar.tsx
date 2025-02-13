"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen((prev) => !prev);

    const links = ["dashboard", "settings", "users", "reports", "logs", "help"];

    return (
        <div className="relative">
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <a key={link} href={`/${link}`} className="hover:bg-gray-700 p-2 rounded transition">
                            {link.charAt(0).toUpperCase() + link.slice(1)}
                        </a>
                    ))}
                </nav>
            </aside>

            <button
                onClick={toggleSidebar}
                className="fixed bottom-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none transition-transform"
                aria-label="Toggle Sidebar"
            >
                <Menu size={24} />
            </button>
        </div>
    );
}
