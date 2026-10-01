import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  robots: { index: false, follow: false },
};

export default function MyProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className="px-6 sm:px-14 pt-12 pb-24">{children}</section>;
}
