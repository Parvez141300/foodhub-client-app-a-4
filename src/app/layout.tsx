import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-expect-error CSS side-effect imports are handled by Next.js.
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
    template: "%s | Feasto",
    default: "Feasto",
  },
  description:
    "This is a food site. Where people search there required food and add to cart then order or direct order.",
  keywords: [
    "food",
    "feasto",
    "prizza",
    "burger",
    "borito",
    "mojo",
    "delivery",
    "healthy",
    "snacks",
  ],
  generator: "Next.js",
  applicationName: "Feasto",
  creator: "Parvez Hossain Alif",
  publisher: "PHA Technologies",
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
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
