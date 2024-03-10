import React, { useState, useEffect } from 'react';
import styles from './MyReviewCard.module.css'; // Import CSS module for styling

const MyReviewCard = ({ course }) => {
  const [reviews, setReviews] = useState([]); // State to hold the fetched reviews
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State to track confirmation dialog open/close
  const [reviewToDelete, setReviewToDelete] = useState(null); // State to store review ID to delete
  const [addDialogOpen, setAddDialogOpen] = useState(false); // State to track add review dialog open/close
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State to track edit review dialog open/close
  const [newRating, setNewRating] = useState(0); // State to hold new review rating
  const [newComment, setNewComment] = useState(''); // State to hold new review comment
  const [reviewToEdit, setReviewToEdit] = useState(null); // State to store review ID to edit

  // Fetch reviews by user and discipline when component mounts
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
    setReviewToDelete(reviewId); // Set the review to delete
    setConfirmationOpen(true); // Open the confirmation dialog
  };

  // Function to confirm delete action
  const confirmDelete = async () => {
    try {
      // Get the user ID from local storage
      const user = JSON.parse(localStorage.getItem('user'));

      // Send DELETE request to delete the review
      const response = await fetch(`http://localhost:8000/review/delete?discipline=${course}&username=${user.username}&reviewId=${reviewToDelete}`, {
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
      setConfirmationOpen(false); // Close the confirmation dialog
      setReviewToDelete(null); // Reset the review to delete
    }
  };

  // Function to cancel delete action
  const cancelDelete = () => {
    setConfirmationOpen(false); // Close the confirmation dialog
    setReviewToDelete(null); // Reset the review to delete
  };

  // Function to handle opening add review dialog
  const handleAdd = () => {
    setAddDialogOpen(true); // Open the add review dialog
  };

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
      setAddDialogOpen(false); // Close the add review dialog
    }
  };

  // Function to cancel adding new review
  const cancelAddReview = () => {
    setAddDialogOpen(false); // Close the add review dialog
    setNewRating(0); // Reset new rating
    setNewComment(''); // Reset new comment
  };

  // Function to handle opening edit review dialog
  const handleEdit = (reviewId) => {
    setReviewToEdit(reviewId); // Set the review to edit
    setEditDialogOpen(true); // Open the edit review dialog
  };

  // Function to handle submitting edited review
  const submitEditedReview = async () => {
    try {
      // Get the user ID from local storage
      const user = JSON.parse(localStorage.getItem('user'));

      // Send PUT request to edit the review
      const response = await fetch(`http://localhost:8000/review/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discipline: course,
          username: user.username,
          reviewId: reviewToEdit,
          rating: newRating,
          comment: newComment,
        }),
      });

      if (response.ok) {
        // Refresh reviews after successful edition
        const updatedReviews = reviews.map(review =>
          review.id === reviewToEdit ? { ...review, rating: newRating, comment: newComment } : review
        );
        setReviews(updatedReviews);
        setNewRating(0); // Reset new rating
        setNewComment(''); // Reset new comment
      } else {
        console.error('Failed to edit review:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing review:', error);
    } finally {
      setEditDialogOpen(false); // Close the edit review dialog
      setReviewToEdit(null); // Reset the review to edit
    }
  };

  // Function to cancel editing review
  const cancelEditReview = () => {
    setEditDialogOpen(false); // Close the edit review dialog
    setReviewToEdit(null); // Reset the review to edit
    setNewRating(0); // Reset new rating
    setNewComment(''); // Reset new comment
  };

  return (
    <div>
      {/* Title outside the box */}
      <h2>Meu Review</h2>

      {/* Review cards */}
      {confirmationOpen ? (
        // Confirmation dialog
        <div className={styles.warningDialog}>
          <p>Tem certeza que deseja deletar este review?</p>
          <button onClick={confirmDelete}>Sim</button>
          <button onClick={cancelDelete}>Não</button>
        </div>
      ) : addDialogOpen ? (
        // Add review dialog
        <div className={styles.addReviewDialog}>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))} />
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button onClick={submitNewReview}>Submit</button>
          <button onClick={cancelAddReview}>Cancel</button>
        </div>
      ) : editDialogOpen ? (
        // Edit review dialog
        <div className={styles.editReviewDialog}>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))} />
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button onClick={submitEditedReview}>Submit</button>
          <button onClick={cancelEditReview}>Cancel</button>
        </div>
      ) : (
        // Review cards
        reviews.length > 0 ? (
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
                <button className={styles.editButton} onClick={() => handleEdit(review.id)}>Edit</button>
                <button className={styles.addButton} onClick={handleAdd}>Add</button>
              </div>
            </div>
          ))
        ) : (
          // No reviews message
          <div className={styles.MyReviewCard}>
            <p>Nenhum review cadastrado ainda</p>
            <div className={styles.buttonContainer}>
              <button className={styles.addButton} onClick={handleAdd}>Add</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MyReviewCard;
