import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const font = IBM_Plex_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EchoSelf",
  description: "See yourself. Hear yourself.",
  openGraph: {
    title: "EchoSelf",
    description: "See yourself. Hear yourself.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoSelf",
    description: "See yourself. Hear yourself.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} min-h-screen bg-zinc-50 text-zinc-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
