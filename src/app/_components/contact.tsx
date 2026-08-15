"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { personalInfo } from "@/lib/utils";
import { Send } from "lucide-react";
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
    <section id="contact" className="px-6 sm:px-14 pb-24">
      <Parallax offset={24} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-card rounded-lg p-11 flex flex-col justify-center h-full">
            <div className="font-mono text-sm text-primary mb-3">{"// contact"}</div>
            <h2 className="text-3xl font-bold tracking-tight mb-3.5">
              Let&apos;s work together
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground mb-6.5">
              Open to new opportunities. Whether you have a question or just want
              to say hi, my inbox is always open.
            </p>
            <div className="flex flex-col gap-3 font-mono text-sm">
              <div>
                <span className="text-muted-foreground/70">email — </span>
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                  {personalInfo.email}
                </a>
              </div>
              <div>
                <span className="text-muted-foreground/70">location — </span>
                <span className="text-foreground/85">{personalInfo.fll_location}</span>
              </div>
              <div className="flex gap-4.5 mt-1.5">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={personalInfo.linked} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={personalInfo.x} target="_blank" rel="noopener noreferrer">
                  X
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-card rounded-lg p-8 flex flex-col gap-4"
          >
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Name
              </label>
              <input
                id="contact-name"
                className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-sm focus:ring-1 focus:ring-primary outline-none"
                placeholder="Name"
                name="name"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email
              </label>
              <input
                id="contact-email"
                className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-sm focus:ring-1 focus:ring-primary outline-none"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-sm focus:ring-1 focus:ring-primary outline-none resize-vertical"
                placeholder="Message"
                name="message"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 py-6 gap-2 text-sm font-semibold"
            >
              {isSubmitting && <Spinner />}
              Send Message <Send size={16} />
            </Button>
          </form>
        </Reveal>
      </Parallax>
    </section>
  );
}
