import React, { useEffect, useState } from 'react';
import styles from './CourseInfo.module.css'; // Import the CSS module

const CourseInfo = ({ course }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/review/get_all`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.filter(review => review.discipline === course.code)); // Filter reviews for the current course
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [course.code]); // Fetch reviews whenever the course code changes

  useEffect(() => {
    // Calculate average rating
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRating / reviews.length;
      setAverageRating(avgRating.toFixed(1)); // Rounded to 1 decimal place
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  return (
    <div className={styles.container}>
      {/* Row 1: Basic info and grade */}
      <div className={styles.row}>
        {/* Basic info container */}
        <div className={styles.infoContainer}>
          <h1>{course.name}</h1>
          <p>Departamento: {course.department}</p>
          <p>Semestre: {course.semester}</p>
          <p>Professor: {course.professor}</p>
        </div>

        {/* Rating container */}
        <div className={styles.ratingContainer}>
          <p className={styles.rating}>{averageRating}</p>
        </div>
      </div>

      {/* Row 2: Description */}
      <div className={styles.row}>
        {/* Description container */}
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
