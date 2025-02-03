import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내모네모",
  description: "내 모든 네모 속 취향 : 내모네모 셀렉트샵",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
