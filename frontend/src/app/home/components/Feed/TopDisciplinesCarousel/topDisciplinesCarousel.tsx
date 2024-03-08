import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardTopDiscipline from '../CardTopDiscipline/cardTopDiscipline'; 
import styles from "./topDisciplinesCarousel.module.css";


const Carousel = () => {
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    const fetchTopDisciplines = async () => {
      try {
        const response = await fetch('http://localhost:8000/review/get_disciplines_by_most_reviews'); 
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setDisciplines(data); 
        }
      } catch (error) {
        console.error('Error fetching top disciplines:', error);
      }
    };

    fetchTopDisciplines();

    const timer = setInterval(fetchTopDisciplines, 30000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (disciplines.length === 0) {
    return null; 
  }

  const settings = {
    dots: true,
    infinite: disciplines.length > 1,
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
    <div>
      <h2 className={styles.heading}>Em Alta</h2>
      <Slider {...settings} className={styles.carousel}>
      {disciplines.map((discipline, index) => (
        <div key={index}>
          <Link to={`/${discipline}`} style={{ textDecoration: 'none' }}>
          <CardTopDiscipline 
            discipline={discipline}
            />
          </Link>
        </div>
      ))}
    </Slider>
  </div>
  );
};

export default Carousel;