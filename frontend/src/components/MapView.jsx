import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Example drone detections
const droneData = [
  { id: 1, type: "Quadcopter", coords: [30.3165, 78.0322] },
  { id: 2, type: "Hexacopter", coords: [30.3180, 78.0350] },
];

const MapView = () => {
  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden mb-6">
      <MapContainer center={[30.3165, 78.0322]} zoom={13} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {droneData.map((drone) => (
          <Marker key={drone.id} position={drone.coords}>
            <Popup>
              {drone.type} detected 🚁
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;