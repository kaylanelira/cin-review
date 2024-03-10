import React, { useEffect, useState } from 'react';
import styles from './MyReviewCard.module.css'; // Import CSS module for styling

const MyReviewCard = ({ onDelete, onEdit, onAdd }) => {
  const [reviews, setReviews] = useState([]); // State to hold the fetched reviews

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:8000/review/get_all');
        if (response.ok) {
          const data = await response.json();
          setReviews(data); // Set reviews state with fetched data
        } else {
          setReviews([]); // If response is not ok, set reviews state to empty array
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []); // Fetch reviews when component mounts

  return (
    <div>
      {/* Title outside the box */}
      <h2>Meu Review</h2>

      {/* Review cards */}
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.MyReviewCard}>
            {/* Rating on the left */}
            <div className={styles.rating}>{review.rating}</div>

            {/* Comment on the right */}
            <div className={styles.comment}>{review.comment}</div>

            {/* Buttons */}
            <div className={styles.buttonContainer}>
              <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
              <button onClick={onEdit} className={styles.editButton}>Edit</button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.MyReviewCard}>
          <p>Você ainda não cadastrou um review cadastrado para essa disciplina.</p>
          <div className={styles.buttonContainer}>
            <button onClick={onAdd} className={styles.addButton}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviewCard;