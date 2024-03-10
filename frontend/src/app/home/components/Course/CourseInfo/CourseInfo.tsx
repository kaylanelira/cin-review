import React from 'react';
import styles from './CourseInfo.module.css'; // Import the CSS module

const CourseInfo = ({ discipline }) => {
  return (
    <div className={styles.container}>
      {/* Row 1: Basic info and grade */}
      <div className={styles.row}>
        {/* Basic info container */}
        <div className={styles.infoContainer}>
          <h1>{discipline.name}</h1>
          <p>Departamento: {discipline.department}</p>
          <p>Semestre: {discipline.semester}</p>
          <p>Professor: {discipline.professor}</p>
        </div>

        {/* Rating container */}
        <div className={styles.ratingContainer}>
          <p className={styles.rating}>10</p>
        </div>
      </div>

      {/* Row 2: Description */}
      <div className={styles.row}>
        {/* Description container */}
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{discipline.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
