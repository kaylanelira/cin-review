import styles from './cardTopDiscipline.module.css';

const CardTopDiscipline = ({ discipline }) => {
  return (
    <div className={styles.card}>
      <div className={styles.discipline}>{discipline}</div>
    </div>
  );
};

export default CardTopDiscipline;