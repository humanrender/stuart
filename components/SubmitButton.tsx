import { useCallback, useEffect, useState } from "react";

import styles from "../styles/components/SubmitButton.module.css";

export const SubmitButton = ({
  className = "",
  label,
  submittingLabel,
  ready = false,
  onSubmit,
}: {
  className?: string;
  label: string;
  submittingLabel: string;
  ready?: boolean;
  onSubmit: () => Promise<void>;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const onClick = useCallback(() => {
    if (ready) {
      const submit = async () => {
        await onSubmit();
        setSubmitting(false);
      };
      setSubmitting(true);
      submit();
    }
  }, [ready]);
  return (
    <span className={`${styles.SubmitButton} ${className}`}>
      <button
        type="submit"
        disabled={!ready || submitting}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {submitting ? submittingLabel : label}
      </button>
    </span>
  );
};
