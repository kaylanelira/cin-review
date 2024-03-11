import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./recentReviewCarousel.module.css";
import CardRecentReview from '../CardRecentReview/cardRecentReview'; 

const Carousel = () => {
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);

  //Pegar reviews mais recentes (com o código da disciplina), é preciso pegar as disciplinas ("join") para pegar o nome da disciplina
  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch('http://localhost:8000/review/get_recent_reviews'); 
        if (response.ok) {
          const data = await response.json();
          const coursesData = await Promise.all(data.map(fetchCourseName));
          setReviews(data); 
          setCourses(coursesData); 
        }
      } catch (error) {
        console.error('Error fetching recent reviews:', error);
      }
    };
  
    fetchRecentReviews();
  
    const timer = setInterval(fetchRecentReviews, 30000); //A cada 30 segundos a lista é atualizada
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  //De acordo com cada código disponível, pega-se a disciplina referente e retorna apenas o nome
  const fetchCourseName = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/discipline/by_code/${data.discipline}`); 
      if (response.ok) {
        const { name } = await response.json();
        return name;
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  //Configurações do carrossel
  const settings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    variableWidth: true,
  };

  return (
    <div data-cy="recentReviewsSection">
    <Slider {...settings} className={styles.carousel} data-cy="RecentReviewCarousel">
      {reviews.map((review, index) => (
        <div key={index} data-cy="recentReviewsCard">
          <CardRecentReview 
            course={courses[index]}
            review={review.comment}
            student={review.username}
          />
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default Carousel;
