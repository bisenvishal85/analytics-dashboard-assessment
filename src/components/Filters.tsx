// import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
  min-width: 140px;
`;

const Button = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
  background: #f5f5f5;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #eaeaea;
  }
`;

type Props = {
  years: string[];
  makes: any[];
  states: any[];
  types: any[];
  filterYear: string;
  setFilterYear: (v: string) => void;
  filterMake: string;
  setFilterMake: (v: string) => void;
  filterType: string;
  setFilterType: (v: string) => void;
  filterState: string;
  setFilterState: (v: string) => void;
};

export default function Filters({
  years,
  makes,
  states,
  types,
  filterYear,
  setFilterYear,
  filterMake,
  setFilterMake,
  filterType,
  setFilterType,
  filterState,
  setFilterState,
}: Props) {
  const clearFilters = () => {
    setFilterYear("all");
    setFilterMake("all");
    setFilterType("all");
    setFilterState("all");
  };

  return (
    <Row>
      <Select
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
      >
        <option value="all">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>

      <Select
        value={filterMake}
        onChange={(e) => setFilterMake(e.target.value)}
      >
        <option value="all">All Makes</option>
        {makes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>

      <Select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>

      <Select
        value={filterState}
        onChange={(e) => setFilterState(e.target.value)}
      >
        <option value="all">All States</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>

      {/* ✅ Clear Button */}
      <button
        onClick={clearFilters}
        style={{
          backgroundColor: "#60a5fa",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Clear Filters
      </button>
    </Row>
  );
}
