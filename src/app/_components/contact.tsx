"use client";

import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/utils";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold tracking-tight">
              Let's work together
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Have a project in mind? I'm currently open to new opportunities.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                <Mail size={20} className="text-black dark:text-white" />
                <a className="hover:underline" href="mailto:hello@alex.dev">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                <MapPin size={20} className="text-black dark:text-white" />
                <span>
                  {personalInfo.country}, {personalInfo.province}
                </span>
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-4 bg-white dark:bg-[#0a0a0a] p-8 rounded-xl border border-slate-200 dark:border-[#262626]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#262626] focus:ring-1 focus:ring-black dark:focus:ring-white outline-none"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#262626] focus:ring-1 focus:ring-black dark:focus:ring-white outline-none"
                type="email"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#262626] focus:ring-1 focus:ring-black dark:focus:ring-white outline-none resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <Button className="w-full py-6 gap-2 text-base">
              Send Message <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
