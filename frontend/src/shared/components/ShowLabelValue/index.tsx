import styles from "./index.module.css";

const ShowLabelValue = ({ label, value}) => {

  return (
    <div className={styles.labelValue}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default ShowLabelValue;
