import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  authors: [{ name: "Arvel Dev" }],
  creator: "Arvel Dev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Arvel Dev | Full Stack Engineer",
    description:
      "Building digital experiences with clean code and modern technology.",
    siteName: "Arvel Dev Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arvel Dev Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvel Dev | Full Stack Engineer",
    description:
      "Building digital experiences with clean code and modern technology.",
    creator: "@your_handle",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Navbar />
          <main className="flex flex-col pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
