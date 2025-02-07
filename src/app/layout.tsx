import type { Metadata } from "next";
import Favicon from "./favicon.ico";
import "../styles/global.scss";

export const metadata: Metadata = {
  title: "내모네모 ",
  description: "내 모든 네모 속 취향 : 내모네모 셀렉트샵",
  icons: { icon: Favicon.src },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="dimmed">
          <section className="container-wrapper">{children}</section>
        </div>
      </body>
    </html>
  );
}
