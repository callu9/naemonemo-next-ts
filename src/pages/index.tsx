// import Image from "next/image";
// import styles from "./page.module.css";

import { Container } from "@/atom/Container";
import { Heading } from "@/atom/Text";
import Card from "@/components/Card";
import { feeds } from "@/mocks";

export default function Home() {
  return (
    <div>
      <Heading>Slider Area</Heading>
      <Heading>Gates Area</Heading>
      <Container spacing={60}>
        {feeds.map((feed) => (
          <Card key={feed.feedNo} {...feed} />
        ))}
      </Container>
    </div>
  );
}
