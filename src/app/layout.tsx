import type { Metadata } from "next";
import "./globals.css";

const systemFontStack =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

export const metadata: Metadata = {
  title: "AFRISCIENCE HUB",
  description: "Afriscience Hub is a platform dedicated to showcasing and promoting scientific research, innovation, and collaboration across Africa. Our mission is to connect researchers, institutions, and industry partners to foster a vibrant scientific community that drives progress and development on the continent.",
  icons: {
    icon: "/miniLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: systemFontStack }}>{children}</body>
    </html>
  );
}
