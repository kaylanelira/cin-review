import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./recentReviewCarousel.module.css";
import CardRecentReview from '../CardRecentReview/cardRecentReview'; 

const Carousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch('http://localhost:8000/review/get_recent_reviews'); 
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setReviews(data); 
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

  if (reviews.length === 0) {
    return null; 
  }

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
          discipline={review.discipline}
          review={review.comment}
          student={review.username}
        />
      </div>
    ))}
  </Slider>
  );
};

export default Carousel;