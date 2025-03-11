import type { Metadata } from "next";
import { Inter, Lora, Inconsolata } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-serif",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-monospace",
});

export const metadata: Metadata = {
  title: "Dictionary Web App",
  description: "A dictionary web application with theme and font switching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} ${inconsolata.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} forcedTheme={undefined}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
