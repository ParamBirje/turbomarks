import type { Metadata } from "next";
import { Teko } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const teko = Teko({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turbomarks - Access bookmarks at speed of thought",
  description:
    "A browser extension that helps you access the frequently accessed sites the vim way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${teko.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
