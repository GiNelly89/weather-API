import React from "react";
import { useContext } from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { LocationContext } from "./context/locationContext";

function DraggableMarker() {
  const context = useContext(LocationContext);
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(context.locationData.geometry);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());

          context.setLocationData({
            geometry: {
              lat: marker.getLatLng().lat,
              lng: marker.getLatLng().lng,
            },
          });
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

export default DraggableMarker;
