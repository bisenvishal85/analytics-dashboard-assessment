import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import { MapPin } from "lucide-react";  // ✅ Lucide MapPin

const MapWrapper = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 8px;
  overflow: hidden;
`;

// ✅ Create a custom icon using lucide-react MapPin
const mapPinIcon = new L.DivIcon({
  html: renderToString(<MapPin color="red" size={28} />),
  className: "", // remove default styles
  iconSize: [28, 28],
  iconAnchor: [14, 28], // center bottom
  popupAnchor: [0, -28],
});

type Vehicle = {
  id: string;
  make: string;
  model: string;
  vehicleLocation: string; // e.g. "POINT (-122.55717 47.733415)"
};

export const MapView: React.FC<{ vehicles: any[] }> = ({ vehicles }) => {
  const positions = vehicles
    .map((v) => {
      const match = v.vehicleLocation?.match(/POINT\s*\(([-\d.]+)\s+([-\d.]+)\)/);
      if (!match) return null;
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);
      return { ...v, lat, lng };
    })
    .filter((v): v is Vehicle & { lat: number; lng: number } => !!v);

  const center = positions.length
    ? [positions[0].lat, positions[0].lng]
    : [37.7749, -122.4194]; // fallback: San Francisco

  return (
    <MapWrapper>
      <MapContainer center={center as [number, number]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {positions.map((p, idx) => (
          <Marker key={p.id ?? idx} position={[p.lat, p.lng]} icon={mapPinIcon}>
            <Popup>
              <div style={{ fontWeight: 700 }}>{p.make} {p.model}</div>
              <div style={{ fontSize: 12 }}>{p.vehicleLocation}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};
