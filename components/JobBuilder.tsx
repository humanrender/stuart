import { useCallback, useState } from "react";

import styles from "../styles/components/JobBuilder.module.css";
import { AddressInput, ADDRESS_TYPE, GeocodeCoordinates } from "./AddressInput";
import { config } from "./config";
import { SubmitButton } from "./SubmitButton";

export interface CreateJobResponse {
  code?: string;
  message?: string;
  pickup?: string;
  dropoff?: string;
}

export interface Job {
  pickup: string;
  dropoff: string;
}

export interface JobBuilderProperties {
  onJobCreated: (job: Job) => void;
  onError: (error: string) => void;
}

const DEFAULT_JOB = { pickup: "", dropoff: "" };

const RESPONSE_CODES = {
  FATAL: "FATAL",
  ERROR: "GEOCODE_ERROR",
};

const ERROR_MESSAGES = {
  [RESPONSE_CODES.FATAL]: "Something went wrong, try again later.",
};

export const JobBuilder = ({ onJobCreated, onError }: JobBuilderProperties) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const update = (newJob: Job, error?: string) => {
    if (error) {
      onError(error);
    } else {
      onJobCreated(newJob);
    }
  };
  const onFormSubmit = useCallback(() => {
    const createJob = async () => {
      return fetch(config.jobsApi, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ pickup, dropoff }),
      })
        .then((response) => response.json())
        .then((result: CreateJobResponse) => {
          if (
            result.code === RESPONSE_CODES.ERROR ||
            result.code === RESPONSE_CODES.FATAL
          ) {
            update(
              { ...DEFAULT_JOB },
              result.message! || ERROR_MESSAGES[result.code] || result.code
            );
          } else if (result.pickup && result.dropoff) {
            update(
              {
                pickup: result.pickup,
                dropoff: result.dropoff,
              },
              ""
            );
          }
        })
        .catch((error) => {
          console.error(error);
          update({ ...DEFAULT_JOB }, ERROR_MESSAGES.FATAL);
        });
    };
    return createJob();
  }, [pickup, dropoff]);
  return (
    <form className={styles.JobBuilder}>
      <AddressInput
        addressType={ADDRESS_TYPE.PICK_UP}
        placeholder="Pick up address"
        onChange={(coordinates: GeocodeCoordinates) => {
          setPickup(coordinates.address);
        }}
      />
      <AddressInput
        addressType={ADDRESS_TYPE.DROP_OFF}
        placeholder="Drop off address"
        onChange={(coordinates: GeocodeCoordinates) => {
          setDropoff(coordinates.address);
        }}
      />
      <SubmitButton
        ready={!!(pickup && dropoff)}
        className={styles.submit}
        label="Create Job"
        submittingLabel="Creating..."
        onSubmit={onFormSubmit}
      />
    </form>
  );
};
