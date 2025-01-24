import { HTMLAttributes } from "react";
import { Container } from "../atom/Container";
import { Lable } from "../atom/Text";
import { token } from "../foundation/color";

interface TabProps extends HTMLAttributes<Element> {
  tabList: any[];
  selected: any;
  onSelect: (value: any) => void;
}
export function TabBar({ tabList = [], selected = {}, onSelect, ...props }: TabProps) {
  return (
    <Container display="flex" spacing={0} {...props}>
      {tabList.map((tab, tidx) => (
        <Lable
          key={tidx}
          fontStyle="Large"
          fontColor={tab.text === selected.text ? "primary" : "tertiary"}
          onClick={() => onSelect(tab)}
          style={{
            cursor: "pointer",
            textAlign: "center",
            padding: "14px 24px",
            width: "100%",
            backgroundColor: token.surface.primary.hex,
            borderBottom: `2px solid ${token.border[tab.text === selected.text ? "tertiary" : "default"].hex}`,
          }}
        >
          {tab?.text}
        </Lable>
      ))}
    </Container>
  );
}
