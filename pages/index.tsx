import type { NextPage } from "next";
import { useState } from "react";
import { FeedbackTooltip } from "../components/FeedbackTooltip";

import { JobBuilder, Job } from "../components/JobBuilder";

import styles from "../styles/Home.module.css";

const FEEDBACK = {
  OK: "Job has been created successfully",
};

const Home: NextPage = () => {
  const [job, setJob] = useState<Job>();
  const [error, setError] = useState("");
  const feedback = job ? FEEDBACK.OK : error;
  return (
    <div className={styles.container}>
      <JobBuilder
        onJobCreated={(job) => {
          setJob(job);
          setError("");
        }}
        onError={(error) => {
          setError(error);
          setJob(undefined);
        }}
      />
      <FeedbackTooltip message={feedback} />
    </div>
  );
};

export default Home;
