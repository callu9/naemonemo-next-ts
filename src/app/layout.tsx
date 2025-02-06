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
      <body>{children}</body>
    </html>
  );
}

// const Dimmed = styled.div`
// background-color: var(--gray-900);
// display: flex;
// justify-content: center;
// `;
// const ContainerWrapper = styled.div`
// box-shadow: 0 0 40px var(--gray-600);
// background-color: white;
// @media (width > 400px) {
//   padding: 52px 32px;
//   width: fit-content;
// }
// `;
