import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import styles from './index.module.css'
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";


const DisciplineAndReview = () => {
  const { code } = useParams();
  const [discipline, setDiscipline] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");
  const storedUser = localStorage.getItem('user');
  const time = "string";

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`);
        if (response.ok) {
          const data = await response.json();
          setDiscipline(data);
        }
      } catch (error) {
        console.error('Error fetching discipline:', error);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/review/get_all`);
        if (response.ok) {
          const data = await response.json();
          const filteredReviews = data.filter(review => review.discipline === code);
          setReviews(filteredReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchDiscipline();
    fetchReviews();

    const timer = setInterval(fetchReviews, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [code]);
  
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReview = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  const handleClick = (type) => {
    if (type === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setSuccessMessage('Review cadastrada com sucesso!');
        setErrorMessage('');

        // Redirecionamento para outra página
        // navigate("/tests")
      } else {
        const errorData = await response.json();
        setErrorMessage(`Erro ao cadastrar review: ${response.status} ${errorData.detail}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação POST:', error);
      setErrorMessage('Erro ao cadastrar review. Tente novamente mais tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <section className={styles.container}>
      <Navbar />
      {discipline.name && <h1 className={styles.heading}>{discipline.name}</h1>}
      {discipline.department && <h1 className={styles.heading}>Departamento: {discipline.department}</h1>}
      {discipline.semester && <h1 className={styles.heading}>Semestre: {discipline.semester}</h1>}
      {discipline.professor && <h1 className={styles.heading}>Professor: {discipline.professor}</h1>}
      {discipline.description && <h1 className={styles.heading}>Descrição: {discipline.description}</h1>}
      <div className={styles.disciplines}>
        <h2 className={styles.heading}>Reviews:</h2>
        {currentReview.map((review, index) => (
        <div key={index} className={styles.review}>
            {review.username && <p className={styles.reviewP}>Username: {review.username}</p>}
            {review.rating && <p className={styles.reviewP}>Rating: {review.rating}</p>}
            {review.comment && <p className={styles.reviewP}>Comment: {review.comment}</p>}
            {review.time && <p className={styles.reviewP}>Time: {review.time}</p>}
        </div>
        ))}
      </div>
      <div>
          {currentPage > 1 && <button onClick={() => handleClick('prev')} className={styles.button}>Anterior</button>}
          {reviews.length > currentPage * reviewsPerPage && <button onClick={() => handleClick('next')} className={styles.button}>Próxima</button>}
        </div>
        
      <h1 className={styles.title}>CADASTRO DE REVIEW</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formInputContainer}>
          <Input text="Comentário" value={comment} setInfo={setComment}/>
          <Input text="Nota" value={rating} setInfo={setRating}/>
          
          {error_message && <p className={styles.errorMessage}>{error_message}</p>}
          {success_message && <p className={styles.success}>{success_message}</p>}
        
        </div>

        <Button data-cy="create" type="submit">
          Cadastrar
        </Button>
      </form>
      </section>
    </div>     
  );
};

export default DisciplineAndReview;
