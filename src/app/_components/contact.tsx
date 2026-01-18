"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { personalInfo } from "@/lib/utils";
import { Mail, MapPin, Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { contactSchema } from "../schema/contact";

export default function ContactSection() {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmittin] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittin(true);

    //safe guard
    if (!form.current) return;

    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());
    const parseData = contactSchema.safeParse(data);

    if (!parseData.success) {
      toast.error(parseData.error.issues[0].message);
      setIsSubmittin(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("API response error");
        toast.error("Something went wrong!");
        setIsSubmittin(false);
        form.current.reset();
      }
      toast.success("Email sent successfully");
      setIsSubmittin(false);
      form.current.reset();
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Something went wrong!");
      setIsSubmittin(false);
      form.current.reset();
    }
  };
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

          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col gap-4 bg-white dark:bg-[#0a0a0a] p-8 rounded-xl border border-slate-200 dark:border-[#262626]"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#262626] focus:ring-1 focus:ring-black dark:focus:ring-white outline-none"
                placeholder="John Doe"
                name="name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#262626] focus:ring-1 focus:ring-black dark:focus:ring-white outline-none"
                type="email"
                placeholder="john@example.com"
                name="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#262626] focus:ring-1 focus:ring-black dark:focus:ring-white outline-none resize-none"
                placeholder="Tell me about your project..."
                name="message"
                required
              />
            </div>
            <Button
              type={"submit"}
              disabled={isSubmitting}
              className="w-full cursor-pointer py-6 gap-2 text-base"
            >
              {isSubmitting && <Spinner />}
              Send Message <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
