import styles from "../styles/components/FeedbackTooltip.module.css";

export const FeedbackTooltip = ({ message = "" }: { message?: string }) => {
  return (
    <>{message && <div className={styles.FeedbackTooltip}>{message}</div>}</>
  );
};
