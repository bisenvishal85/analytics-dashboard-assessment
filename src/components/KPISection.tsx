import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: stretch;
`;

const Card = styled.div`
  background: ${(p: any) => p.theme.cardBg};
  border-radius: 8px;
  padding: 12px;
  box-shadow: var(--smooth-shadow);
`;

export const KPISection: React.FC<{ stats: { label: string; value: string | number }[] }> = ({ stats }) => {
  return (
    <Grid>
      {stats.map((s) => (
        <Card key={s.label}>
          <div style={{ fontSize: 12, color: "gray" }}>{s.label}</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{s.value}</div>
        </Card>
      ))}
    </Grid>
  );
};
