import { createContext, useState } from "react";

export const LocationContext = createContext();

export function LocationContextProvider({ children }) {
  const [locationData, setLocationData] = useState({
    geometry: { lat: 53.552343789837124, lng: 10.017986297607424 },
  });
  const [weatherData, setWeatherData] = useState(null);
  const [map, setMap] = useState(0);
  const [zoom, setZoom] = useState(11);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <LocationContext.Provider
      value={{
        locationData,
        setLocationData,
        weatherData,
        setWeatherData,
        map,
        setMap,
        zoom,
        setZoom,
        position,
        setPosition,
        loading,
        setLoading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
