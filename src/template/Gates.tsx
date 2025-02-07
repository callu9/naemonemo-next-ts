import { Gate, getGateList } from "@/app/api/gates/route";
import { Container } from "@/atom/Container";
import GateListItem from "@/components/GateItem";

export default async function Gates() {
  const gateList = await getGateList();
  return (
    <div className="gate-list">
      <Container className="gate-list-wrapper" justify="left" gap={16}>
        {gateList?.map((gate: Gate) => (
          <GateListItem key={gate.gateId} {...gate} />
        ))}
      </Container>
    </div>
  );
}
