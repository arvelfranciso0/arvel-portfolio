import type { Metadata } from "next";
import { Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { MotionConfig } from "motion/react";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Arvel Dev | Full Stack Engineer",
    template: "%s | Arvel Dev",
  },
  description:
    "Full-stack engineer specializing in building exceptional digital experiences. Crafting performant, accessible, and beautiful web applications.",
  keywords: [
    "Arvel Dev",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Portfolio",
  ],
  // authors: [{ name: "Arvel Dev" }],
  // creator: "Arvel Dev",
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: "https://your-domain.com",
  //   title: "Arvel Dev | Full Stack Engineer",
  //   description:
  //     "Building digital experiences with clean code and modern technology.",
  //   siteName: "Arvel Dev Portfolio",
  //   images: [
  //     {
  //       url: "/og-image.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Arvel Dev Portfolio Preview",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Arvel Dev | Full Stack Engineer",
  //   description:
  //     "Building digital experiences with clean code and modern technology.",
  //   creator: "@your_handle",
  //   images: ["/og-image.png"],
  // },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${ibmPlexMono.variable} antialiased`}>
        <MotionConfig reducedMotion="user">
          <div className="max-w-320 mx-auto">
            <Navbar />
            <main className="flex flex-col">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </MotionConfig>
      </body>
    </html>
  );
}
