import type { NextPage } from "next";

import { JobBuilder } from "../components/JobBuilder";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <JobBuilder />
    </div>
  );
};

export default Home;
