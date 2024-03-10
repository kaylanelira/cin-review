import React, { useState, useEffect } from 'react';
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
          const disciplinesData = await Promise.all(data.map(fetchDisciplineName));
          setDisciplines(disciplinesData.filter(discipline => discipline)); 
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

  const fetchDisciplineName = async (code) => {
    try {
      const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`);
      if (response.ok) {
        const { code, name } = await response.json();
        return [code, name];
      }
    } catch (error) {
      console.error('Error fetching discipline:', error);
    }
    return null;
  };

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
          discipline && (
            <div key={index}>
              <CardTopDiscipline disciplineCode={discipline[0]} disciplineName={discipline[1]}/>
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;