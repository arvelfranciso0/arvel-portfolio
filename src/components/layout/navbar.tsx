"use client";

import { Download, Menu, Moon, Sun, Terminal } from "lucide-react";
import Head from "next/head";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { personalInfo } from "@/lib/utils";
import Link from "next/link";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-[#262626] bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Button asChild variant={"ghost"} className="flex items-center gap-3">
            <Link href={"/#home"}>
              <Terminal size={18} />
              <span className="font-bold text-lg tracking-tight uppercase">
                {personalInfo.fname}.DEV
              </span>
            </Link>
          </Button>

          <div className="hidden md:flex items-center gap-8">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild className="hidden md:flex gap-2">
              <a
                href="/arvel-resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume <Download size={14} />
              </a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </div>
      </nav>
    </>
  );
}
