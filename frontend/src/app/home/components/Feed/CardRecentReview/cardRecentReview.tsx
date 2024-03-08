import styles from './cardRecentReview.module.css';

const CardRecentReview = ({ discipline, review, student }) => {
  return (
    <div className={styles.card}>
      <div className={styles.discipline}>{discipline}</div>
      <div className={styles.review}>{review}</div>
      <div className={styles.student}>{student}</div>
    </div>
  );
};

export default CardRecentReview;