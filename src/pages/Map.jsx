// src/pages/Map.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Setting up marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const [markers, setMarkers] = useState([
    { id: 1, name: "Colaba", position: [18.9100, 72.8090] },
    { id: 2, name: "Dadar", position: [19.0196, 72.8425] },
    { id: 3, name: "Bandra", position: [19.0600, 72.8300] },
    { id: 4, name: "Andheri", position: [19.1196, 72.8465] },
    { id: 5, name: "Thane", position: [19.2183, 72.9781] },
  ]);

  const addMarker = (e) => {
    const newMarker = {
      id: markers.length + 1,
      name: `New Location ${markers.length + 1}`,
      position: [e.latlng.lat, e.latlng.lng],
    };
    setMarkers([...markers, newMarker]);
  };

  function MapClickHandler() {
    useMapEvents({
      click: addMarker,
    });
    return null;
  }

  const removeMarker = (id) => {
    setMarkers(markers.filter((marker) => marker.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Interactive Map</h2>
      <MapContainer
        center={[19.0760, 72.8777]} // Mumbai Coordinates
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-[500px] rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const updatedMarkers = markers.map((m) =>
                  m.id === marker.id
                    ? { ...m, position: [e.target.getLatLng().lat, e.target.getLatLng().lng] }
                    : m
                );
                setMarkers(updatedMarkers);
              },
            }}
          >
            <Popup>
              <div className="flex flex-col">
                <h3 className="font-bold">{marker.name}</h3>
                <button
                  className="text-red-500 mt-2"
                  onClick={() => removeMarker(marker.id)}
                >
                  Remove Marker
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
