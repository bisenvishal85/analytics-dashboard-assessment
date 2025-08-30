
import React, { useState } from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import { Eye, MapPin, X } from "lucide-react"; // ✅ added X icon
import Modal from "./Modal";
import { MapView } from "./MapView";

const TableWrap = styled.div`
  background: ${(p: any) => p.theme.cardBg};
  padding: 10px;
  border-radius: 8px;
  box-shadow: var(--smooth-shadow);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 8px;
    border-bottom: 1px solid #e6e6e6;
    text-align: left;
    font-size: 13px;
  }
  th {
    color: gray;
    font-weight: 600;
  }
`;

const TableScroll = styled.div`
  width: 100%;
  max-height: 500px; /* you can adjust */
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #e6e6e6;
  border-radius: 6px;

  /* For sticky headers */
  thead th {
    position: sticky;
    top: 0;
    background: ${(p: any) => p.theme.cardBg};
    z-index: 2;
  }
`;

const Chip = styled.span`
  display: inline-block;
  background: #f0f0f0;
  border-radius: 16px;
  padding: 4px 10px;
  font-size: 12px;
  margin: 4px;
`;

export type EVRow = {
  modelYear?: string;
  make?: string;
  model?: string;
  evType?: string;
  rangeMiles?: string;
  city?: string;
  state?: string;
  vehicleLocation?: string;
  _raw?: Record<string, unknown>;
};

export default function DataTable({ rows }: { rows: any[] }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25); // ✅ rows per page selector
  const [selectedRow, setSelectedRow] = useState<EVRow | null>(null);

  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const pageRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const exportCsv = () => {
    const headers = new Set<string>();
    rows.forEach((r) => {
      Object.keys(r._raw ?? {}).forEach((k) => headers.add(k));
    });
    const hdr = Array.from(headers);
    const csv = [hdr.join(",")]
      .concat(
        rows.map((r) =>
          hdr
            .map((h) => `"${String(r._raw?.[h] ?? "").replace(/"/g, '""')}"`)
            .join(",")
        )
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "ev_export.csv");
  };

  return (
    <>
      <TableWrap>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            Showing {rows.length} records
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* ✅ Rows per page selector */}
            <label style={{ fontSize: 13 }}>
              Rows per page:{" "}
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[10, 25, 50, 100].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
            >
              Prev
            </button>
            <div>
              {page}/{totalPages}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
            <button onClick={exportCsv}>Export CSV</button>
          </div>{" "}
        </div>

        {/* ✅ Scrollable container for the table */}
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Type</th>
                <th>Range</th>
                <th>City</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r, i) => (
                <tr key={i}>
                  <td>{r.modelYear ?? ""}</td>
                  <td>{r.make ?? ""}</td>
                  <td>{r.model ?? ""}</td>
                  <td>{r.evType ?? ""}</td>
                  <td>{r.rangeMiles ?? ""}</td>
                  <td>{r.city ?? ""}</td>
                  <td>{r.state ?? ""}</td>
                  <td style={{ textAlign: "center" }}>
                    {r.vehicleLocation ? (
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedRow(r)}
                        title="View"
                      >
                        <Eye size={20} color="#1976d2" />
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>
      </TableWrap>

      {/* ✅ Popup with chips and close icon in header */}
      <Modal isOpen={!!selectedRow} onClose={() => setSelectedRow(null)}>
        {selectedRow && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h3 style={{ margin: 0 }}>
                {selectedRow.make} {selectedRow.model}
              </h3>
              <button
                onClick={() => setSelectedRow(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* ✅ Chips with 3 per row */}
            <div
              style={{ display: "flex", flexWrap: "wrap", paddingBottom: 20 }}
            >
              {[
                ["Year", selectedRow.modelYear],
                ["Make", selectedRow.make],
                ["Model", selectedRow.model],
                ["Type", selectedRow.evType],
                ["Range", selectedRow.rangeMiles],
                ["City", selectedRow.city],
                ["State", selectedRow.state],
              ]
                .filter(([, v]) => v)
                .map(([label, value], idx) => (
                  <Chip key={idx}>
                    <strong>{label}:</strong> {value}
                  </Chip>
                ))}
            </div>

            <MapView vehicles={[selectedRow]} />
          </div>
        )}
      </Modal>
    </>
  );
}
