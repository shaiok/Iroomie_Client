import  { useEffect, useRef, ReactNode } from "react";
import { MapContainer, TileLayer,  useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
const icon = "../../assets/marker-icon.png";
const iconShadow = "../../assets/marker-shadow.png"; 

// Fix for marker icon issues in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom hook to update map view
function useMapUpdater(map: L.Map | null, center: L.LatLngExpression, zoom: number) {
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
}

// Component to handle map updates
interface MapUpdaterProps {
  center: L.LatLngExpression;
  zoom: number;
}

function MapUpdater({ center, zoom }: MapUpdaterProps) {
  const map = useMap();
  useMapUpdater(map, center, zoom);
  return null;
}

interface MapContentProps {
  center?: L.LatLngExpression;
  zoom?: number;
  children?: ReactNode;
}

function MapContent({ center = [51.505, -0.09], zoom = 13, children }: MapContentProps) {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {}, [center, zoom, children]);

  return (
    <MapContainer
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} zoom={zoom} />
      {children}
    </MapContainer>
  );
}

export default MapContent;