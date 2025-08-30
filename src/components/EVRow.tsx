// src/components/EVRow.tsx
import React from "react";
// import { Vehicle } from "../types"; // define Vehicle type in src/types.ts if not already

const EVRow: React.FC<{ vehicle:any }> = ({ vehicle }) => {
  return (
    <tr>
      <td>{vehicle.make}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.location}</td>
    </tr>
  );
};

export default EVRow;
