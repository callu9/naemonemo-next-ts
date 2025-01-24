import styled from "styled-components";
import { Container } from "../atom/Container";
import { Body, Title } from "../atom/Text";
import { layout } from "../foundation/layout";
import { Button, ButtonProps } from "./Button";

export interface DialogProps {
  title: string;
  messages: string;
  btns: ButtonProps[];
}
export const Dialog = ({ title, messages, btns = [{ text: "닫기" }] }: DialogProps) => {
  const DialogBackground = styled.div`
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    position: fixed;
    ${layout.flex({})}
    background-color: rgba(35, 37, 39, 0.25);
    > .grid-container {
      width: 400px;
      padding: 24px 16px 16px;
      > .btns-wrapper {
        width: 368px;
        > button {
          width: 100%;
        }
      }
    }
  `;
  return (
    <DialogBackground>
      <Container display="flex" bgColor="primary" direction="column" radius={16} spacing={24}>
        <Title fontStyle="Small">{title}</Title>
        <Container justify="center" spacing={0}>
          {messages?.split("\\n")?.map((line, lidx) => (
            <Body fontColor="secondary" key={lidx}>
              {line}
            </Body>
          ))}
        </Container>
        <Container className="btns-wrapper" display="flex" spacing={8}>
          {btns?.map((btn, bidx) => <Button key={bidx} {...btn} />)}
        </Container>
      </Container>
    </DialogBackground>
  );
};
