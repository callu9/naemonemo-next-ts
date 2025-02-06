import { Gate, getGateList } from "@/app/api/gates/route";
import { Container } from "@/atom/Container";
import GateListItem from "@/components/GateItem";

// const GateListWrapper = styled.div`
//   ${layout.grid({ justify: "flex-start", spacing: 16 })}
//   grid-template: repeat(2, 1fr) / repeat(5, 1fr);
//   grid-auto-flow: column;
// `;
export default async function Gates() {
  const gateList = await getGateList();
  return (
    <Container
      className="gate-list"
      display="flex"
      justify="left"
      spacing={16}
      style={{ maxWidth: "336px", overflow: "scroll" }}
    >
      <div>
        {gateList?.map((gate: Gate) => (
          <GateListItem key={gate.gateId} {...gate} />
        ))}
      </div>
    </Container>
  );
}
