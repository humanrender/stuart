import { Marker } from "@react-google-maps/api";

import { Map } from "./Map";

export const JobMap = ({
  pickup,
  dropoff,
}: {
  pickup: google.maps.LatLngLiteral | null;
  dropoff: google.maps.LatLngLiteral | null;
}) => {
  let bounds = null;
  if (pickup && dropoff) {
    bounds = new window.google.maps.LatLngBounds();
    bounds.extend(pickup);
    bounds.extend(dropoff);
  }

  return (
    <Map bounds={bounds}>
      {pickup && <Marker icon="/icons/pickUpMarker.svg" position={pickup} />}
      {dropoff && <Marker icon="/icons/dropOffMarker.svg" position={dropoff} />}
    </Map>
  );
};
// const bounds = ;
// map.fitBounds(bounds);
