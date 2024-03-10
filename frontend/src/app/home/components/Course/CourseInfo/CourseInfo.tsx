import React, { useState, useEffect } from 'react';
import styles from './CourseInfo.module.css'; // Import the CSS module

const CourseInfo = ({ course }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:8000/review/get_all');
        if (response.ok) {
          const reviews = await response.json();
          // Filtrar revisões para a disciplina específica
          const courseReviews = reviews.filter(review => review.discipline === course.code);
          // Calcular a média do rating
          if (courseReviews.length > 0) {
            const totalRating = courseReviews.reduce((sum, review) => sum + review.rating, 0);
            const average = totalRating / courseReviews.length;
            setAverageRating(average);
          }
        } else {
          console.error('Failed to fetch reviews:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [course.code]);

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
          <p className={styles.rating}>{averageRating.toFixed(0)}</p>
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
