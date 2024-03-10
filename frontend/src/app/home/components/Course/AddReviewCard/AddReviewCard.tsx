import React, { useState, useEffect } from 'react';
import styles from './AddReviewCard.module.css'; // Import CSS module for styling

const AddReviewCard = ({ course, onCancel }) => {
  const [reviews, setReviews] = useState([]); // State to hold the fetched reviews
  const [newRating, setNewRating] = useState(0); // State to hold new review rating
  const [newComment, setNewComment] = useState(''); // State to hold new review comment

  // Function to handle submitting new review
  const submitNewReview = async () => {
    try {
      // Get the user ID from local storage
      const user = JSON.parse(localStorage.getItem('user'));

      // Send POST request to add the new review
      const response = await fetch(`http://localhost:8000/review/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discipline: course,
          username: user.username,
          rating: newRating,
          comment: newComment,
        }),
      });

      if (response.ok) {
        // Refresh reviews after successful addition
        const updatedReviews = [...reviews, { id: Date.now(), rating: newRating, comment: newComment, time: new Date().toISOString() }];
        setReviews(updatedReviews);
        setNewRating(0); // Reset new rating
        setNewComment(''); // Reset new comment
      } else {
        console.error('Failed to add review:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      onCancel();
    }
  };

  return (
    <div>
      {/* Title outside the box */}
      <h2>Meu Review</h2>

      <div className={styles.AddReviewCard}>
        <label htmlFor="rating">Nota:</label>
        <input type="number" id="rating" value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))} />
        <label htmlFor="comment">Comentário:</label>
        <textarea id="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <div className={styles.buttonContainer}>
          <button className={styles.noButton} onClick={onCancel}>Cancelar</button>
          <button className={styles.yesButton} onClick={submitNewReview}>Enviar</button>
        </div>
      </div>

    </div>
  );
};

export default AddReviewCard;
