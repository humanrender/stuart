import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@react-hook/debounce";

import { config } from "./config";

import styles from "../styles/components/AddressInput.module.css";

export interface GeocodeResponse {
  code?: string;
  address?: string;
  message?: string;
  latitude?: number;
  longitude?: number;
}

export interface GeocodeCoordinates {
  address: string;
  latitude: number;
  longitude: number;
}

export interface AddressInputState {
  coordinates: GeocodeCoordinates;
  error?: string;
  submitting: boolean;
}

export const STATES = {
  BLANK: "Blank",
  ERROR: "Error",
  PRESENT: "Present",
};

export enum ADDRESS_TYPE {
  DROP_OFF = "dropOff",
  PICK_UP = "pickUp",
}

const RESPONSE_CODES = {
  ERROR: "GEOCODE_ERROR",
};

const DEFAULT_COORDINATES = { address: "", latitude: 0, longitude: 0 };

const validateCoordinates = (coordinates: {
  latitude?: number;
  longitude?: number;
  address?: string;
}): coordinates is GeocodeCoordinates =>
  !!(coordinates.latitude && coordinates.longitude && coordinates.address);

export const AddressInput = ({
  addressType = ADDRESS_TYPE.DROP_OFF,
  placeholder = "",
  debounce = 500,
  onChange,
}: {
  addressType?: ADDRESS_TYPE[keyof ADDRESS_TYPE];
  placeholder?: string;
  debounce?: number;
  onChange: (coordinates: GeocodeCoordinates) => void;
}) => {
  const [address, setAddress] = useDebounce<string>("", debounce);
  const [coordinates, setCoordinates] = useState({ ...DEFAULT_COORDINATES });
  const [error, setError] = useState("");
  const update = (coordinates: GeocodeCoordinates, error: string) => {
    setCoordinates(coordinates);
    setError(error);
    onChange(coordinates);
  };
  useEffect(() => {
    if (
      !address &&
      (coordinates.address ||
        coordinates.latitude ||
        coordinates.longitude ||
        error)
    ) {
      update({ ...DEFAULT_COORDINATES }, "");
    } else if (address) {
      const geocodeAddress = async (address: string) => {
        return fetch(config.geolocateApi, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({ address }),
        })
          .then((response) => response.json())
          .then((result: GeocodeResponse) => {
            if (result.code === RESPONSE_CODES.ERROR) {
              update({ ...DEFAULT_COORDINATES }, result.message!);
            } else if (validateCoordinates(result)) {
              update(
                {
                  address: result.address,
                  latitude: result.latitude,
                  longitude: result.longitude,
                },
                ""
              );
            }
          })
          .catch((error) => {
            console.error(error);
            update({ ...DEFAULT_COORDINATES }, error.toString());
          });
      };
      geocodeAddress(address);
    }
  }, [address]);
  const state = error
    ? STATES.ERROR
    : coordinates.latitude && coordinates.longitude
    ? STATES.PRESENT
    : STATES.BLANK;
  return (
    <div className={styles.AddressInput}>
      <img
        className={styles.icon}
        src={`/icons/${addressType}Badge${state || ""}.svg`}
      />
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value.toString() || "")
        }
      />
    </div>
  );
};
