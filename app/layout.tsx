import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: allow importing global CSS in this environment
import "./globals.css";
import { NeonAuthUIProvider } from '@neondatabase/auth-ui';
import { authClient } from '@/lib/auth/client';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PyLynx Desktop",
  description: "A mythic youth-first desktop environment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrapping children makes the imports active and applies global auth context */}
        <NeonAuthUIProvider authClient={authClient as any}>
          {children}
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
