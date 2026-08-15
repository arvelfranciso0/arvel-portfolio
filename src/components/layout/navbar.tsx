"use client";

import { Briefcase, Cpu, Download, Github, Linkedin, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState } from "react";
import { personalInfo } from "@/lib/utils";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { name: "Work", href: "/#work", icon: Briefcase },
  { name: "Skills", href: "/#skills", icon: Cpu },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="px-6 sm:px-14 py-7 flex items-center justify-between"
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-mono text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
      >
        {personalInfo.fname.toLowerCase()}
        <span className="text-primary">/</span>
        {personalInfo.lastname.toLowerCase()}
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-7">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.name}
          </Link>
        ))}
        <Button
          asChild
          size="sm"
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-[13px] font-semibold"
        >
          <a href="/arvel-resume.pdf" download>
            Resume <Download size={14} />
          </a>
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col w-75 sm:w-100">
          <SheetHeader className="text-left">
            <SheetTitle className="font-mono text-lg">
              {personalInfo.fname.toLowerCase()}
              <span className="text-primary">/</span>
              {personalInfo.lastname.toLowerCase()}
            </SheetTitle>
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

            <Button
              asChild
              className="w-full gap-2 py-6 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="/arvel-resume.pdf" download>
                Download Resume <Download size={18} />
              </a>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
}
