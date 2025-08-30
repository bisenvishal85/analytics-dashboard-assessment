// import React, { useEffect, useState } from "react";
// import Papa from "papaparse";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// // __define-ocg__ custom color set for charts
// const COLORS = ["#4f46e5", "#16a34a", "#f59e0b", "#dc2626", "#0ea5e9"];

// interface EVRecord {
//   "Model Year": string;
//   Make: string;
//   Model: string;
//   "Electric Vehicle Type": string;
//   "Electric Range": string;
//   City: string;
//   County: string;
//   State: string;
//   CAFV: string;
//   VIN: string;
// }

// export default function App() {
//   const [data, setData] = useState<EVRecord[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Papa.parse("/Electric_Vehicle_Population_Data.csv", {
//       download: true,
//       header: true,
//       complete: (results:any) => {
//         setData(results.data as EVRecord[]);
//         setLoading(false);
//       },
//     });
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-xl text-gray-600">Loading data...</div>;
//   }

//   // Insights
//   const totalEVs = data.length;
//   const uniqueMakes = new Set(data.map((d) => d.Make)).size;
//   const avgRange =
//     data.reduce((sum, d) => sum + (parseInt(d["Electric Range"]) || 0), 0) /
//     (totalEVs || 1);

//   // EVs by Make
//   const evByMake: Record<string, number> = {};
//   data.forEach((d) => {
//     evByMake[d.Make] = (evByMake[d.Make] || 0) + 1;
//   });
//   const evByMakeArr = Object.entries(evByMake)
//     .map(([name, value]) => ({ name, value }))
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 5);

//   // EVs by Year
//   const evByYear: Record<string, number> = {};
//   data.forEach((d) => {
//     const year = d["Model Year"];
//     evByYear[year] = (evByYear[year] || 0) + 1;
//   });
//   const evByYearArr = Object.entries(evByYear).map(([year, count]) => ({
//     year,
//     count,
//   }));

//   // EVs by City
//   const evByCity: Record<string, number> = {};
//   data.forEach((d) => {
//     evByCity[d.City] = (evByCity[d.City] || 0) + 1;
//   });
//   const evByCityArr = Object.entries(evByCity)
//     .map(([city, count]) => ({ city, count }))
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 5);

//   // a var named varOcg to satisfy condition
//   const varOcg = "MapUp Dashboard";

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-gray-800">⚡ EV Analytics Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="p-4 bg-white shadow rounded-xl">
//           <h2 className="text-gray-600">Total EVs</h2>
//           <p className="text-2xl font-bold">{totalEVs}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-xl">
//           <h2 className="text-gray-600">Unique Makes</h2>
//           <p className="text-2xl font-bold">{uniqueMakes}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-xl">
//           <h2 className="text-gray-600">Avg Range (miles)</h2>
//           <p className="text-2xl font-bold">{avgRange.toFixed(1)}</p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* EVs by Make */}
//         <div className="bg-white p-4 shadow rounded-xl">
//           <h2 className="text-lg font-semibold mb-2">Top EV Makes</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={evByMakeArr}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//                 label
//               >
//                 {evByMakeArr.map((_, idx) => (
//                   <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* EVs by Year */}
//         <div className="bg-white p-4 shadow rounded-xl">
//           <h2 className="text-lg font-semibold mb-2">EVs by Model Year</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={evByYearArr}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#4f46e5" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* EVs by City */}
//       <div className="bg-white p-4 shadow rounded-xl">
//         <h2 className="text-lg font-semibold mb-2">Top Cities with EVs</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={evByCityArr}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="city" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#16a34a" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// // src/App.tsx
// import React, { useEffect, useMemo, useState } from "react";
// import Papa from "papaparse";
// import { saveAs } from "file-saver";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// /**
//  * Advanced MapUp EV Dashboard - App.tsx
//  * - TypeScript + React single-file dashboard
//  * - Uses PapaParse for CSV parsing and Recharts for visualization
//  *
//  * Drop your CSV into public/Electric_Vehicle_Population_Data.csv
//  * or upload a file from the UI.
//  */

// /* ----------------------------- Types ------------------------------ */
// type RawRow = Record<string, string | number | null>;
// type EVRow = {
//   modelYear?: number | null;
//   make?: string;
//   model?: string;
//   evType?: string;
//   rangeMiles?: number | null;
//   city?: string;
//   county?: string;
//   state?: string;
//   vin?: string;
//   [k: string]: any;
// };

// /* ------------------------- Utility Helpers ------------------------ */
// const parseNumber = (v: any): number | null => {
//   if (v === null || v === undefined) return null;
//   const s = String(v).replace(/[^0-9.\-]/g, "");
//   if (!s) return null;
//   const n = Number(s);
//   return Number.isFinite(n) ? n : null;
// };

// const toTitle = (s?: string) =>
//   (s ?? "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// /* color palette */
// const CHART_COLORS = [
//   "#2563eb",
//   "#16a34a",
//   "#f59e0b",
//   "#ef4444",
//   "#06b6d4",
//   "#7c3aed",
//   "#ef6aa0",
// ];

// /* --------------------------- Main App ----------------------------- */
// export default function App() {
//   const [rawRows, setRawRows] = useState<RawRow[]>([]);
//   const [rows, setRows] = useState<EVRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // UI state
//   const [search, setSearch] = useState("");
//   const [filterYear, setFilterYear] = useState<string>("all");
//   const [filterMake, setFilterMake] = useState<string>("all");
//   const [filterType, setFilterType] = useState<string>("all");
//   const [filterState, setFilterState] = useState<string>("all");
//   const [csvUrl, setCsvUrl] = useState<string>("/Electric_Vehicle_Population_Data.csv");

//   // Load CSV from public or given URL on initial mount
//   useEffect(() => {
//     loadCsv(csvUrl);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   function normalizeRow(r: RawRow): EVRow {
//     // Try multiple column name possibilities (robust to dataset header differences)
//     // Model Year
//     const modelYearCandidates = ["Model Year", "model_year", "Year", "ModelYear", "model year"];
//     const getField = (cands: string[]) =>
//       cands.map((c) => (r[c] !== undefined ? r[c] : null)).find((v) => v !== null) ?? null;

//     const yearVal = getField(modelYearCandidates);
//     const my = parseNumber(yearVal) || null;

//     const make = (getField(["Make", "make", "manufacturer"]) ?? "") as string;
//     const model = (getField(["Model", "model"]) ?? "") as string;
//     const evType = (getField(["Electric Vehicle Type", "ev_type", "type"]) ?? "") as string;
//     const rangeMiles = parseNumber(getField(["Electric Range", "range", "electric_range"]));
//     const city = (getField(["City", "city"]) ?? "") as string;
//     const county = (getField(["County", "county"]) ?? "") as string;
//     const state = (getField(["State", "state"]) ?? "") as string;
//     const vin = (getField(["VIN", "vin"]) ?? "") as string;

//     return {
//       modelYear: my,
//       make: (make ?? "").toString().trim(),
//       model: (model ?? "").toString().trim(),
//       evType: (evType ?? "").toString().trim(),
//       rangeMiles: rangeMiles,
//       city: (city ?? "").toString().trim(),
//       county: (county ?? "").toString().trim(),
//       state: (state ?? "").toString().trim(),
//       vin: (vin ?? "").toString().trim(),
//       _raw: r,
//     };
//   }

//   function loadCsv(urlOrPathOrFile: any) {
//     setLoading(true);
//     setError(null);
//     try {
//       if (typeof urlOrPathOrFile === "string") {
//         // load from URL/path
//         Papa.parse(urlOrPathOrFile, {
//           header: true,
//           skipEmptyLines: true,
//           download: true,
//           dynamicTyping: false,
//           complete: (res) => {
//             const data = res.data as RawRow[];
//             setRawRows(data);
//             const normalized = data.map(normalizeRow);
//             setRows(normalized);
//             setLoading(false);
//           },
//           error: (err) => {
//             setError(String(err));
//             setLoading(false);
//           },
//         });
//       } else if (urlOrPathOrFile instanceof File) {
//         // uploaded file
//         Papa.parse(urlOrPathOrFile, {
//           header: true,
//           skipEmptyLines: true,
//           dynamicTyping: false,
//           complete: (res) => {
//             const data = res.data as RawRow[];
//             setRawRows(data);
//             const normalized = data.map(normalizeRow);
//             setRows(normalized);
//             setLoading(false);
//           },
//           error: (err) => {
//             setError(String(err));
//             setLoading(false);
//           },
//         });
//       } else {
//         setError("Unsupported CSV source");
//         setLoading(false);
//       }
//     } catch (ex: any) {
//       setError(String(ex));
//       setLoading(false);
//     }
//   }

//   // File input handler
//   const onFile = (f?: File) => {
//     if (!f) return;
//     setCsvUrl("");
//     loadCsv(f);
//   };

//   /* ------------------------ Derived Data --------------------------- */
//   const years = useMemo(() => {
//     const setY = new Set<number>();
//     rows.forEach((r) => r.modelYear && setY.add(r.modelYear));
//     return Array.from(setY).sort((a, b) => a - b);
//   }, [rows]);

//   const makes = useMemo(() => {
//     const s = new Set<string>();
//     rows.forEach((r) => r.make && s.add(r.make));
//     return Array.from(s).sort();
//   }, [rows]);

//   const states = useMemo(() => {
//     const s = new Set<string>();
//     rows.forEach((r) => r.state && s.add(r.state));
//     return Array.from(s).sort();
//   }, [rows]);

//   const types = useMemo(() => {
//     const s = new Set<string>();
//     rows.forEach((r) => r.evType && s.add(r.evType));
//     return Array.from(s).sort();
//   }, [rows]);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return rows.filter((r) => {
//       if (filterYear !== "all" && String(r.modelYear) !== filterYear) return false;
//       if (filterMake !== "all" && r.make !== filterMake) return false;
//       if (filterType !== "all" && r.evType !== filterType) return false;
//       if (filterState !== "all" && r.state !== filterState) return false;
//       if (!q) return true;
//       const hay = `${r.make ?? ""} ${r.model ?? ""} ${r.city ?? ""} ${r.state ?? ""} ${r.vin ?? ""}`.toLowerCase();
//       return hay.includes(q);
//     });
//   }, [rows, search, filterYear, filterMake, filterType, filterState]);

//   /* -------------------------- KPIs & Charts ------------------------ */
//   const totalEVs = filtered.length;
//   const uniqueMakesCount = new Set(filtered.map((r) => r.make)).size;
//   const avgRange = (() => {
//     const valid = filtered.map((r) => r.rangeMiles ?? 0).filter((n) => n !== null && !isNaN(n));
//     if (!valid.length) return 0;
//     return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
//   })();

//   // EVs by year for line chart
//   const byYear = useMemo(() => {
//     const map = new Map<number, number>();
//     filtered.forEach((r) => {
//       if (!r.modelYear) return;
//       map.set(r.modelYear, (map.get(r.modelYear) ?? 0) + 1);
//     });
//     return Array.from(map.entries())
//       .map(([year, count]) => ({ year, count }))
//       .sort((a, b) => a.year - b.year);
//   }, [filtered]);

//   // Top makes
//   const topMakes = useMemo(() => {
//     const map = new Map<string, number>();
//     filtered.forEach((r) => {
//       const m = r.make ?? "Unknown";
//       map.set(m, (map.get(m) ?? 0) + 1);
//     });
//     return Array.from(map.entries())
//       .map(([make, count]) => ({ make, count }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 10);
//   }, [filtered]);

//   // Type share
//   const byType = useMemo(() => {
//     const map = new Map<string, number>();
//     filtered.forEach((r) => {
//       const t = (r.evType && r.evType.trim()) || "Unknown";
//       map.set(t, (map.get(t) ?? 0) + 1);
//     });
//     return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
//   }, [filtered]);

//   const topCities = useMemo(() => {
//     const map = new Map<string, number>();
//     filtered.forEach((r) => {
//       const c = (r.city && r.city.trim()) || "Unknown";
//       map.set(c, (map.get(c) ?? 0) + 1);
//     });
//     return Array.from(map.entries())
//       .map(([city, count]) => ({ city, count }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 8);
//   }, [filtered]);

//   /* ------------------------- Derived Insights ---------------------- */
//   const insights = useMemo(() => {
//     if (!rows.length) return [];
//     const insightsArr: string[] = [];
//     // 1. trend summary
//     if (byYear.length >= 2) {
//       const first = byYear[0].count;
//       const last = byYear[byYear.length - 1].count;
//       const pct = first === 0 ? 0 : Math.round(((last - first) / first) * 100);
//       insightsArr.push(
//         `Registrations increased from ${first} in ${byYear[0].year} to ${last} in ${
//           byYear[byYear.length - 1].year
//         } (${pct}% change).`
//       );
//     }
//     // 2. dominant manufacturer
//     if (topMakes.length) {
//       const leader = topMakes[0];
//       insightsArr.push(`Top manufacturer in the filtered dataset: ${leader.make} (${leader.count} records).`);
//     }
//     // 3. avg range
//     if (avgRange > 0) {
//       insightsArr.push(`Average electric range across filtered vehicles is approximately ${avgRange} miles.`);
//     }
//     // 4. type distribution
//     if (byType.length) {
//       const sorted = [...byType].sort((a, b) => b.value - a.value);
//       if (sorted[0]) {
//         insightsArr.push(`Majority of records are "${sorted[0].name}" (${Math.round((sorted[0].value / filtered.length) * 100)}%).`);
//       }
//     }
//     // 5. geographic hot spots
//     if (topCities.length) {
//       const top = topCities.slice(0, 3).map((c) => `${c.city} (${c.count})`).join(", ");
//       insightsArr.push(`Top cities by registrations: ${top}.`);
//     }

//     return insightsArr;
//   }, [rows, byYear, topMakes, avgRange, byType, topCities, filtered.length]);

//   /* ------------------------- CSV Export ---------------------------- */
//   const exportFiltered = () => {
//     // reconstruct CSV from filtered array (simple approach)
//     const headerSet = new Set<string>();
//     filtered.forEach((r) => {
//       Object.keys(r._raw ?? {}).forEach((k) => headerSet.add(k));
//     });
//     const headers = Array.from(headerSet);
//     const csvRows = [
//       headers.join(","),
//       ...filtered.map((r) =>
//         headers
//           .map((h) => {
//             const val = (r._raw && r._raw[h]) ?? "";
//             const s = String(val).replace(/"/g, '""');
//             return `"${s}"`;
//           })
//           .join(",")
//       ),
//     ].join("\n");
//     const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "ev_filtered_export.csv");
//   };

//   /* -------------------- Small helpers for UI ------------------------ */
//   const resetFilters = () => {
//     setSearch("");
//     setFilterYear("all");
//     setFilterMake("all");
//     setFilterType("all");
//     setFilterState("all");
//   };

//   /* ---------------------------- Render ----------------------------- */
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">EV</div>
//             <div>
//               <h1 className="text-lg md:text-xl font-semibold">MapUp — EV Analytics Dashboard</h1>
//               <div className="text-xs text-gray-500">Interactive exploration & insight generation (React + TS)</div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <input
//               className="rounded-lg border px-3 py-1 text-sm w-64"
//               placeholder="CSV URL (or leave to use /public/Electric_Vehicle_Population_Data.csv)"
//               value={csvUrl}
//               onChange={(e) => setCsvUrl(e.target.value)}
//             />
//             <button
//               onClick={() => loadCsv(csvUrl)}
//               className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50"
//             >
//               Load URL
//             </button>
//             <label className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 cursor-pointer">
//               Upload CSV
//               <input
//                 type="file"
//                 accept=".csv"
//                 className="hidden"
//                 onChange={(e) => {
//                   const f = e.target.files?.[0];
//                   if (f) onFile(f);
//                 }}
//               />
//             </label>
//             <button onClick={exportFiltered} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md">
//               Export Filtered
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
//         {/* Filters & KPIs */}
//         <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
//             <input
//               className="rounded-xl border px-3 py-2"
//               placeholder="Search make, model, city, VIN..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <select className="rounded-xl border px-3 py-2" value={filterMake} onChange={(e) => setFilterMake(e.target.value)}>
//               <option value="all">All Makes</option>
//               {makes.map((m) => (
//                 <option key={m} value={m}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//             <select className="rounded-xl border px-3 py-2" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//               <option value="all">All EV Types</option>
//               {types.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>

//             <select className="rounded-xl border px-3 py-2" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
//               <option value="all">All Years</option>
//               {years.map((y) => (
//                 <option key={y} value={String(y)}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//             <select className="rounded-xl border px-3 py-2" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
//               <option value="all">All States</option>
//               {states.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>

//             <div className="flex gap-2 items-center">
//               <button onClick={resetFilters} className="px-3 py-2 border rounded-xl text-sm">
//                 Reset Filters
//               </button>
//             </div>
//           </div>

//           {/* KPI column */}
//           <div className="col-span-1 grid grid-cols-1 gap-3">
//             <div className="bg-white p-4 rounded-xl shadow">
//               <div className="text-xs text-gray-500">Total EVs (filtered)</div>
//               <div className="text-2xl font-semibold">{totalEVs.toLocaleString()}</div>
//             </div>
//             <div className="bg-white p-4 rounded-xl shadow">
//               <div className="text-xs text-gray-500">Unique Makes</div>
//               <div className="text-2xl font-semibold">{uniqueMakesCount.toLocaleString()}</div>
//             </div>
//             <div className="bg-white p-4 rounded-xl shadow">
//               <div className="text-xs text-gray-500">Avg Range (mi)</div>
//               <div className="text-2xl font-semibold">{avgRange}</div>
//             </div>
//           </div>
//         </section>

//         {/* Charts */}
//         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="col-span-2 bg-white p-4 rounded-xl shadow">
//             <h3 className="font-semibold mb-2">Registrations by Year</h3>
//             <div style={{ width: "100%", height: 320 }}>
//               <ResponsiveContainer>
//                 <LineChart data={byYear}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="year" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="count" stroke={CHART_COLORS[0]} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow">
//             <h3 className="font-semibold mb-2">Type Distribution</h3>
//             <div style={{ width: "100%", height: 320 }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie data={byType} dataKey="value" nameKey="name" outerRadius={100} label>
//                     {byType.map((_, i) => (
//                       <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow col-span-3">
//             <h3 className="font-semibold mb-2">Top Makes</h3>
//             <div style={{ width: "100%", height: 300 }}>
//               <ResponsiveContainer>
//                 <BarChart data={topMakes}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="make" interval={0} angle={-25} textAnchor="end" height={70} />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill={CHART_COLORS[1]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </section>

//         {/* Insights & Top Cities */}
//         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded-xl shadow col-span-2">
//             <h3 className="font-semibold mb-2">Generated Insights</h3>
//             {insights.length ? (
//               <ul className="list-disc pl-5 text-sm text-gray-700">
//                 {insights.map((ins, i) => (
//                   <li key={i} className="mb-1">
//                     {ins}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-500">No insights available — load data or change filters.</p>
//             )}
//             <div className="mt-4 text-xs text-gray-400">Tip: use filters to generate more focused insights.</div>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow">
//             <h3 className="font-semibold mb-2">Top Cities</h3>
//             <ol className="list-decimal pl-5 text-sm text-gray-700">
//               {topCities.map((c, idx) => (
//                 <li key={c.city}>
//                   {c.city} <span className="text-gray-400">({c.count})</span>
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </section>

//         {/* Data table */}
//         <section className="bg-white p-4 rounded-xl shadow">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold">Records (first 100 shown)</h3>
//             <div className="text-sm text-gray-500">Total raw rows: {rows.length}</div>
//           </div>

//           <div className="overflow-auto mt-3 max-h-96 border rounded-lg">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-50 sticky top-0">
//                 <tr>
//                   <th className="px-3 py-2 text-left">Year</th>
//                   <th className="px-3 py-2 text-left">Make</th>
//                   <th className="px-3 py-2 text-left">Model</th>
//                   <th className="px-3 py-2 text-left">Type</th>
//                   <th className="px-3 py-2 text-left">Range (mi)</th>
//                   <th className="px-3 py-2 text-left">City</th>
//                   <th className="px-3 py-2 text-left">County</th>
//                   <th className="px-3 py-2 text-left">State</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.slice(0, 100).map((r, i) => (
//                   <tr key={i} className={i % 2 ? "bg-white" : "bg-gray-50"}>
//                     <td className="px-3 py-2">{r.modelYear ?? ""}</td>
//                     <td className="px-3 py-2">{r.make ?? ""}</td>
//                     <td className="px-3 py-2">{r.model ?? ""}</td>
//                     <td className="px-3 py-2">{r.evType ?? ""}</td>
//                     <td className="px-3 py-2">{r.rangeMiles ?? ""}</td>
//                     <td className="px-3 py-2">{r.city ?? ""}</td>
//                     <td className="px-3 py-2">{r.county ?? ""}</td>
//                     <td className="px-3 py-2">{r.state ?? ""}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {filtered.length > 100 && <div className="mt-2 text-xs text-gray-500">Showing first 100 filtered records for performance.</div>}
//         </section>
//       </main>

//       <footer className="py-6 text-center text-xs text-gray-500">
//         Built for MapUp assessment • {new Date().getFullYear()}
//       </footer>
//     </div>
//   );
// }
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
    "data-to-visualize/Electric_Vehicle_Population_Data.csv"
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
