
import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import styled from "styled-components";
// import { ThemeProviderWrapper, useTheme } from "./components/ThemeProviderWrapper";
import { KPISection } from "./components/KPISection";
import EVCharts from "./components/EVCharts";
import Filters from "./components/Filters";
import DataTable from "./components/DataTable";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./context/ThemeContext";
import ThemeProviderWrapper from "./components/ThemeProviderWrapper";

/** --- Layout Containers --- **/
const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px;
  font-family: "Inter", Arial, sans-serif;
  color: ${(p: any) => p.theme.text};   // 👈 use theme text color
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const SectionCard = styled.div`
  background: ${(p: any) => p.theme.cardBg};
  color: ${(p: any) => p.theme.text};   // 👈 use theme text color
  padding: 16px;
  border-radius: 12px;
  box-shadow: var(--smooth-shadow);
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
`;

/** --- Types --- **/
type RawRow = Record<string, any>;
export type EVRow = {
  modelYear?: number | null;
  make?: string;
  model?: string;
  evType?: string;
  rangeMiles?: number | null;
  city?: string;
  county?: string;
  state?: string;
  vehicleLocation?: string;
  vin?: string;
  _raw?: RawRow;
};

/** --- Normalize Function --- **/
function normalizeRow(r: RawRow): EVRow {
  const get = (candidates: string[]) =>
    candidates
      .map((c) => (r[c] !== undefined ? r[c] : null))
      .find((v) => v != null) ?? null;

  const modelYearVal = get(["Model Year", "model_year", "Year", "year"]);
  const modelYear = modelYearVal
    ? Number(String(modelYearVal).replace(/\D/g, "")) || null
    : null;

  return {
    modelYear,
    make: (get(["Make", "make", "Manufacturer"]) ?? "").toString().trim(),
    model: (get(["Model", "model"]) ?? "").toString().trim(),
    evType: (get(["Electric Vehicle Type", "ev_type", "Type"]) ?? "")
      .toString()
      .trim(),
    rangeMiles: get(["Electric Range", "Range"])
      ? Number(get(["Electric Range", "Range"]))
      : null,
    city: (get(["City", "city"]) ?? "").toString().trim(),
    county: (get(["County", "county"]) ?? "").toString().trim(),
    state: (get(["State", "state"]) ?? "").toString().trim(),
    vehicleLocation: (get(["Vehicle Location", "location"]) ?? "")
      .toString()
      .trim(),
    vin: (get(["VIN", "vin"]) ?? "").toString().trim(),
    _raw: r,
  };
}

/** --- Theme Toggle Component --- **/
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      style={{
        border: "none",
        borderRadius: "50%",
        padding: "6px",
        cursor: "pointer",
        background: "transparent",
      }}
      title="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

/** --- Main App --- **/
function AppInner() {
  const [rows, setRows] = useState<EVRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [csvUrl, setCsvUrl] = useState<string>(
    "Electric_Vehicle_Population_Data.csv"
  );

  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [filterMake, setFilterMake] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterState, setFilterState] = useState<string>("all");

  useEffect(() => {
    loadCsv(csvUrl);
  }, []);

  function loadCsv(urlOrFile: string | File) {
    setLoading(true);
    const options = {
      header: true,
      skipEmptyLines: true,
      complete: (res: any) => {
        const data = res.data as RawRow[];
        setRows(data.map(normalizeRow));
        setLoading(false);
      },
      error: () => setLoading(false),
    };
    if (typeof urlOrFile === "string")
      Papa.parse(urlOrFile, { ...options, download: true });
    else Papa.parse(urlOrFile, options);
  }

  const years = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.modelYear).filter(Boolean))).sort(
        (a, b) => (a! > b! ? 1 : -1)
      ),
    [rows]
  );
  const makes = useMemo(
    () => Array.from(new Set(rows.map((r) => r.make).filter(Boolean))).sort(),
    [rows]
  );
  const states = useMemo(
    () => Array.from(new Set(rows.map((r) => r.state).filter(Boolean))).sort(),
    [rows]
  );
  const types = useMemo(
    () => Array.from(new Set(rows.map((r) => r.evType).filter(Boolean))).sort(),
    [rows]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filterYear !== "all" && String(r.modelYear) !== filterYear)
        return false;
      if (filterMake !== "all" && r.make !== filterMake) return false;
      if (filterType !== "all" && r.evType !== filterType) return false;
      if (filterState !== "all" && r.state !== filterState) return false;
      if (!q) return true;
      return `${r.make} ${r.model} ${r.city} ${r.state} ${r.vin}`
        .toLowerCase()
        .includes(q);
    });
  }, [rows, search, filterYear, filterMake, filterType, filterState]);

  const totalEVs = filtered.length;
  const uniqueMakes = new Set(filtered.map((r) => r.make)).size;
  const avgRange = Math.round(
    (filtered
      .map((r) => r.rangeMiles ?? 0)
      .filter((n) => !isNaN(n))
      .reduce((a, b) => a + b, 0) || 0) /
      Math.max(1, filtered.filter((r) => r.rangeMiles != null).length)
  );

  const topMake = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((r) => {
      if (!r.make) return;
      map.set(r.make, (map.get(r.make) ?? 0) + 1);
    });
    return (
      Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A"
    );
  }, [filtered]);

  if (loading) return <div style={{ padding: 20 }}>Loading dataset...</div>;

  return (
    <AppContainer>
      {/* Header */}
      <Header>
        <Title>⚡ MapUp — EV Analytics Dashboard</Title>
        <ThemeToggle />
      </Header>

      {/* Upload & Controls */}
<SectionCard style={{ marginBottom: 16, padding: "12px 16px" }}>
  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      alignItems: "center", // ✅ keeps everything in one line
    }}
  >
    <input
      placeholder="CSV URL (leave blank to use built-in)"
      value={csvUrl}
      onChange={(e) => setCsvUrl(e.target.value)}
      style={{
        flex: "1 1 320px",
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #ccc",
      }}
    />

    <button
      onClick={() => loadCsv(csvUrl)}
      style={{
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #888",
        background: "#60a5fa",
        cursor: "pointer",
      }}
    >
      Load URL
    </button>

    <label>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => e.target.files?.[0] && loadCsv(e.target.files[0])}
        style={{ display: "none" }}
      />
      <span
        style={{
          cursor: "pointer",
          padding: "8px 12px",
          border: "1px solid #888",
          borderRadius: 6,
          background: "#60a5fa",
        }}
      >
        Upload CSV
      </span>
    </label>
  </div>
</SectionCard>


      {/* <GridLayout> */}
      {/* Left Panel: Filters + Charts */}
      <div>
        <SectionCard style={{ marginBottom: 16, padding: "12px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <input
              placeholder="🔍 Search make/model/city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                width: "90%", // ⬅️ smaller width
                borderRadius: "20px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <Filters
            years={years.map(String)}
            makes={makes}
            states={states}
            types={types}
            filterYear={filterYear}
            setFilterYear={setFilterYear}
            filterMake={filterMake}
            setFilterMake={setFilterMake}
            filterType={filterType}
            setFilterType={setFilterType}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </SectionCard>
      </div>

      <div>
        <SectionCard>
          <KPISection
            stats={[
              { label: "Total EVs", value: totalEVs.toLocaleString() },
              { label: "Unique Makes", value: uniqueMakes },
              { label: "Avg Range (mi)", value: avgRange },
              { label: "Top Make", value: topMake },
            ]}
          />
        </SectionCard>
      </div>
      <div>
        <SectionCard>
          <EVCharts rows={filtered} />
        </SectionCard>
      </div>

      {/* Right Panel: KPIs */}
      {/* <aside> */}

      {/* </aside> */}
      {/* </GridLayout> */}

      {/* Data Table */}
      <SectionCard style={{ marginTop: 16 }}>
        <DataTable rows={filtered} />
      </SectionCard>
    </AppContainer>
  );
}

/** --- Wrap in Theme Provider --- **/
export default function App() {
  return (
    <ThemeProviderWrapper>
      <AppInner />
    </ThemeProviderWrapper>
  );
}
