import { GlobalStyles } from "../styles/globalStyles";
import type { AppProps } from "next/app";
import styled from "styled-components";
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const Dimmed = styled.div`
    background-color: var(--gray-900);
    display: flex;
    justify-content: center;
  `;
  const ContainerWrapper = styled.div`
    box-shadow: 0 0 40px var(--gray-600);
    background-color: white;
    @media (width > 400px) {
      padding: 52px 32px;
      width: fit-content;
    }
  `;
  return (
    <>
      <GlobalStyles />
      <Dimmed className="dimmed">
        <ContainerWrapper className="containter-wrapper">
          <Component {...pageProps} />
        </ContainerWrapper>
      </Dimmed>
    </>
  );
}

export default MyApp;
