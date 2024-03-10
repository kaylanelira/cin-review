import React, { useState, useEffect } from 'react';
import styles from './MyReviewCard.module.css'; // Import CSS module for styling

const MyReviewCard = ({ course }) => {
  const [reviews, setReviews] = useState([]); // State to hold the fetched reviews

  useEffect(() => {
    const fetchReview = async () => {
      try {
        // Get the user ID from local storage
        const user = JSON.parse(localStorage.getItem('user'));

        // Fetch reviews by user and discipline
        const response = await fetch(`http://localhost:8000/review/get_by_user_discipline?username=${user.username}&discipline=${course}`);

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

    fetchReview();
  }, [course]); // Fetch reviews when component mounts and when course changes

  // Function to handle delete review action
  const handleDelete = async (reviewId) => {
    try {
      // Get the user ID from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Send DELETE request to delete the review
      const response = await fetch(`http://localhost:8000/review/delete?discipline=${course}&username=${user.username}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh reviews after successful deletion
        const updatedReviews = reviews.filter(review => review.id !== reviewId);
        setReviews(updatedReviews);
      } else {
        console.error('Failed to delete review:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

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

            {/* Time in the top right corner */}
            <div className={styles.time}>{review.time}</div>

            {/* Buttons */}
            <div className={styles.buttonContainer}>
              <button className={styles.deleteButton} onClick={() => handleDelete(review.id)}>Delete</button>
              <button className={styles.editButton}>Edit</button>
              <button className={styles.addButton}>Add</button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.MyReviewCard}>
          <p>Nenhum review cadastrado ainda</p>
          <div className={styles.buttonContainer}>
            <button className={styles.deleteButton} onClick={() => handleDelete(review.id)}>Delete</button>
            <button className={styles.editButton}>Edit</button>
            <button className={styles.addButton}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviewCard;
