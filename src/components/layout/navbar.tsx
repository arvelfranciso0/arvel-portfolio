"use client";

import {
  Download,
  Menu,
  Moon,
  Sun,
  Terminal,
  User,
  Briefcase,
  Cpu,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { personalInfo } from "@/lib/utils";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// Navigation items with icons for the sidebar
const navItems = [
  { name: "About", href: "/#about", icon: User },
  { name: "Projects", href: "/#projects", icon: Briefcase },
  { name: "Skills", href: "/#skills", icon: Cpu },
  { name: "Contact", href: "/#contact", icon: Mail },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-[#262626] bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/#home"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Terminal size={22} className="text-primary" />
          <span className="font-bold text-lg tracking-tight uppercase">
            {personalInfo.fname}.DEV
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden md:flex gap-2">
            <a href="/arvel-resume.pdf" download>
              Resume <Download size={14} />
            </a>
          </Button>

          {/* Improved Mobile Sidebar */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col w-75 sm:w-100">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2 text-xl">
                  <Terminal size={20} className="text-primary" />
                  <span>Arvel.DEV</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Portfolio navigation menu
                </SheetDescription>
              </SheetHeader>

              <Separator className="my-4" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 grow">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all group"
                  >
                    <item.icon
                      size={20}
                      className="group-hover:text-primary transition-colors"
                    />
                    <span className="font-medium text-base">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Sidebar Footer */}
              <SheetFooter className="flex-col items-stretch gap-4 sm:flex-col mt-auto pb-6">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider px-4">
                    Get in touch
                  </p>
                  <div className="flex gap-2 px-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`${personalInfo.github}`} target="_blank">
                        <Github size={20} />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`${personalInfo.linked}`} target="_blank">
                        <Linkedin size={20} />
                      </Link>
                    </Button>
                  </div>
                </div>

                <Button asChild className="w-full gap-2 py-6 text-base">
                  <a href="/arvel-resume.pdf" download>
                    Download Resume <Download size={18} />
                  </a>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
