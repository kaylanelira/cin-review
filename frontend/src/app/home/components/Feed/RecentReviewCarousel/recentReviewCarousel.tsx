import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./recentReviewCarousel.module.css";
import CardRecentReview from '../CardRecentReview/cardRecentReview'; 

const Carousel = () => {
  const [reviews, setReviews] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch('http://localhost:8000/review/get_recent_reviews'); 
        if (response.ok) {
          const data = await response.json();
          const disciplinesData = await Promise.all(data.map(fetchDisciplineName));
          setReviews(data); 
          setDisciplines(disciplinesData); 
        }
      } catch (error) {
        console.error('Error fetching recent reviews:', error);
      }
    };
  
    fetchRecentReviews();
  
    const timer = setInterval(fetchRecentReviews, 30000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const fetchDisciplineName = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/discipline/by_code/${data.discipline}`); 
      if (response.ok) {
        const { name } = await response.json();
        return name;
      }
    } catch (error) {
      console.error('Error fetching discipline:', error);
    }
  };

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
    <Slider {...settings} className={styles.carousel}>
      {reviews.map((review, index) => (
        <div key={index}>
          <CardRecentReview 
            discipline={disciplines[index]}
            review={review.comment}
            student={review.username}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
