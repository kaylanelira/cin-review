import React from 'react';
import styles from './MyReviewCard.module.css'; // Import CSS module for styling

const MyReviewCard = ({ onDelete, onEdit, onAdd }) => {
  return (
    <div>
      {/* Title outside the box */}
      <h2>Meu Review</h2>

      {/* Review card */}
      <div className={styles.MyReviewCard}>
        {/* Text content */}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
          <button onClick={onEdit} className={styles.editButton}>Edit</button>
          <button onClick={onAdd} className={styles.addButton}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;
