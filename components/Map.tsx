import { useState, memo, useCallback, ReactNode, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import styles from "../styles/components/Map.module.css";

const center = {
  lat: 48.869615,
  lng: 2.336415,
};

const MapWrapper = ({
  children,
  bounds,
}: {
  children: ReactNode;
  bounds: google.maps.LatLngBounds | null;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxwgvb6uJ9UKyVegatuWcixU0L9SzvRx0",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={styles.Map}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {children}
    </GoogleMap>
  ) : (
    <></>
  );
};

export const Map = memo(MapWrapper);
