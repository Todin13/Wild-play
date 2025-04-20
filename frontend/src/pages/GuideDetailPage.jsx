import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import GuideDetailCard from "@/components/ui/GuideDetail";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const GuideDetailPage = () => {
  const location = useLocation();
  const { guide } = location.state || {};

  const mapRef = useRef(null);

  const firstLocation = guide?.locations?.[0];
  const defaultCenter =
    firstLocation?.lat && firstLocation?.lon
      ? [firstLocation.lat, firstLocation.lon]
      : [48.8566, 2.3522]; // fallback to Paris

  // Fix map not resizing correctly when shown in sticky/flex layout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
        mapRef.current.setView(defaultCenter);
      }
    }, 300); // slight delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [defaultCenter]);

  return (
    <MainLayout>
      <section className="px-4 lg:px-12 py-12 mx-auto min-w-[95vw]">
        <div
          className="
            flex flex-col items-center gap-6
            lg:flex-row lg:gap-24 lg:justify-center
          "
        >
          {/* Guide Card */}
          <div className="w-full lg:w-[45%] max-w-[525px]">
            <GuideDetailCard guide={guide} />
          </div>

          {/* Map */}
          {guide.locations && guide.locations.length > 0 && (
            <div className="w-full lg:w-[50%] sticky top-24 h-[50vh] lg:h-[80vh]">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-voga-border">
                <MapContainer
                  center={defaultCenter}
                  zoom={6}
                  scrollWheelZoom
                  className="h-full w-full"
                  whenCreated={(mapInstance) => {
                    mapRef.current = mapInstance;
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {guide.locations.map((loc, idx) =>
                    loc.lat && loc.lon ? (
                      <Marker key={idx} position={[loc.lat, loc.lon]}>
                        <Popup>
                          <strong>{loc.name}</strong>
                          <br />
                          {loc.section}
                        </Popup>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                          {loc.name}
                        </Tooltip>
                      </Marker>
                    ) : null
                  )}
                </MapContainer>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default GuideDetailPage;
