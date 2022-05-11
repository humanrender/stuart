import type { NextPage } from "next";
import { useState } from "react";
import { GeocodeCoordinates } from "../components/AddressInput";
import { FeedbackTooltip } from "../components/FeedbackTooltip";

import { JobBuilder, Job } from "../components/JobBuilder";
import { JobMap } from "../components/JobMap";

import styles from "../styles/Home.module.css";

const FEEDBACK = {
  OK: "Job has been created successfully",
};

const Home: NextPage = () => {
  const [job, setJob] = useState<Job>();
  const [error, setError] = useState("");
  const [pickup, setPickup] = useState<GeocodeCoordinates>();
  const [dropoff, setDropoff] = useState<GeocodeCoordinates>();
  const feedback = job ? FEEDBACK.OK : error;
  const mapProperties = {
    pickup: pickup ? { lat: pickup!.latitude, lng: pickup!.longitude } : null,
    dropoff: dropoff
      ? { lat: dropoff!.latitude, lng: dropoff!.longitude }
      : null,
  };
  return (
    <div className={styles.container}>
      <JobMap {...mapProperties} />
      <JobBuilder
        onJobCreated={(job) => {
          setJob(job);
          setError("");
        }}
        onError={(error) => {
          setError(error);
          setJob(undefined);
        }}
        onPickup={(coordinates: GeocodeCoordinates) => {
          setPickup(coordinates);
        }}
        onDropoff={(coordinates: GeocodeCoordinates) => {
          setDropoff(coordinates);
        }}
      />
      <FeedbackTooltip message={feedback} />
    </div>
  );
};

export default Home;
