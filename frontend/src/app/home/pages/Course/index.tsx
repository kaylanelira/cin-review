import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import styles from './index.module.css';
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";
import MyReviewCard from '../../components/Course/MyReviewCard/MyReviewCard';
import CourseInfo from "../../components/Course/CourseInfo/CourseInfo";

const Course = () => {
  const { code } = useParams(); // Get the course code from the URL params
  const [course, setcourse] = useState({}); // State to hold course information
  const [reviews, setReviews] = useState([]); // State to hold reviews for the course
  const [comment, setComment] = useState(""); // State for the review comment
  const [rating, setRating] = useState(""); // State for the review rating
  const [error_message, setErrorMessage] = useState(""); // State for error messages
  const [success_message, setSuccessMessage] = useState(""); // State for success messages
  const storedUser = localStorage.getItem('user'); // Get user data from local storage
  const time = "string"; // Placeholder for time (not used)

  // Fetch course information when component mounts
  useEffect(() => {
    const fetchcourse = async () => {
      try {
        const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`);
        if (response.ok) {
          const data = await response.json();
          setcourse(data); // Set course state with fetched data
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchcourse();
  }, [code]); // Fetch course whenever the code parameter changes

  return (
    <div>
      <section className={styles.container}>
        <Navbar />
        <CourseInfo course={course} />
        <MyReviewCard course={code} />
      </section>
    </div>
  );
};

export default Course;
