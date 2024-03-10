import React, { useState, useEffect } from 'react';
import styles from './DeleteReviewCard.module.css'; // Import CSS module for styling

const DeleteReviewCard = ({ course, onCancel }) => {
  const [reviews, setReviews] = useState([]); // State to hold the fetched reviews

  // Function to confirm delete action
  const confirmDelete = async () => {
    try {
      // Get the user ID from local storage
      const user = JSON.parse(localStorage.getItem('user'));

      // Send DELETE request to delete the review
      const response = await fetch(`http://localhost:8000/review/delete?discipline=${course}&username=${user.username}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh reviews after successful deletion
        const updatedReviews = reviews.filter(review => review.id !== reviewToDelete);
        setReviews(updatedReviews);
      } else {
        console.error('Failed to delete review:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      onCancel();
    }
  };

  return (
    <div>
      {/* Title outside the box */}
      <h2>Meu Review</h2>

      {/* Review cards */}
      <div className={styles.DeleteReviewCard}>
        <p>Tem certeza que deseja deletar este review?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.noButton} onClick={onCancel}>Não</button>
          <button className={styles.yesButton} onClick={confirmDelete}>Sim</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewCard;
