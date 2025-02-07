import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";
import Link from "next/link";
import IconBag from "../../assets/icon/ic-bag.svg";
import Logo from "../../assets/icon/logo.svg";

export default function Header() {
  return <MainHeader />;
}
function MainHeader() {
  return (
    <ul className="header-nav display-flex justify-sides">
      <li>
        <Link href="/">
          <Container display="flex" justify="left" gap={8}>
            <Logo width="40" height="40" />
            <Text usage="title" fontStyle="small">
              내모네모
            </Text>
          </Container>
        </Link>
      </li>
      <li>
        <Link href="/cart">
          <IconBag width="24" height="24" />
        </Link>
      </li>
    </ul>
  );
}
