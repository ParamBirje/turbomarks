"use client";

import Link from "next/link";

export function DarkModeMinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-xl text-gray-400">
            © {currentYear} Turbomarks. MIT License.
          </div>
          <div className="text-xl text-gray-400">
            Built with 💖 by{" "}
            <Link
              href="https://parambirje.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Param Birje
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
