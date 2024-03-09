import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import styles from './index.module.css';
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";
import MyReviewCard from '../../components/Course/MyReviewCard/MyReviewCard';
import CourseInfo from "../../components/Course/CourseInfo/CourseInfo";

const Course = () => {
  const { code } = useParams(); // Get the discipline code from the URL params
  const [discipline, setDiscipline] = useState({}); // State to hold discipline information
  const [reviews, setReviews] = useState([]); // State to hold reviews for the discipline
  const [comment, setComment] = useState(""); // State for the review comment
  const [rating, setRating] = useState(""); // State for the review rating
  const [error_message, setErrorMessage] = useState(""); // State for error messages
  const [success_message, setSuccessMessage] = useState(""); // State for success messages
  const storedUser = localStorage.getItem('user'); // Get user data from local storage
  const time = "string"; // Placeholder for time (not used)

  // Fetch discipline information when component mounts
  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`);
        if (response.ok) {
          const data = await response.json();
          setDiscipline(data); // Set discipline state with fetched data
        }
      } catch (error) {
        console.error('Error fetching discipline:', error);
      }
    };
    fetchDiscipline();
  }, [code]); // Fetch discipline whenever the code parameter changes

  // Handle submission of review form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const reviewData = {
      username: JSON.parse(storedUser).username,
      discipline: code,
      rating: parseInt(rating), 
      comment,
      time,
    };

    try {
      const response = await fetch('http://localhost:8000/review/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.status === 200) {
        setSuccessMessage('Review cadastrada com sucesso!'); // Set success message
        setErrorMessage(''); // Clear error message
      } else {
        const errorData = await response.json();
        setErrorMessage(`Erro ao cadastrar review: ${response.status} ${errorData.detail}`); // Set error message
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação POST:', error);
      setErrorMessage('Erro ao cadastrar review. Tente novamente mais tarde.'); // Set error message
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div>
      <section className={styles.container}>
        <Navbar />
        <CourseInfo discipline={discipline} />
        <MyReviewCard />

        {/* Display review form */}
        <h1 className={styles.title}>CADASTRO DE REVIEW</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formInputContainer}>
            {/* Input for review comment */}
            <Input text="Comentário" value={comment} setInfo={setComment}/>
            {/* Input for review rating */}
            <Input text="Nota" value={rating} setInfo={setRating}/>
            
            {/* Error and success messages */}
            {error_message && <p className={styles.errorMessage}>{error_message}</p>}
            {success_message && <p className={styles.success}>{success_message}</p>}
          </div>

          {/* Button to submit review */}
          <Button data-cy="create" type="submit">
            Cadastrar
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Course;
