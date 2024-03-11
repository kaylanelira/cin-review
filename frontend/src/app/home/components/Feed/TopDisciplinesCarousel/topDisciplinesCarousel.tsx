import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardTopCourse from '../CardTopDiscipline/cardTopDiscipline'; 
import styles from "./topDisciplinesCarousel.module.css";

const Carousel = () => {
  const [courses, setCourses] = useState([]);

  //Pegar os cursos com mais reviews, retorna uma array com códigos das disciplinas
  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/review/get_disciplines_by_most_reviews'); 
        if (response.ok) {
          const data = await response.json();
          const coursesData = await Promise.all(data.map(fetchCourseName));
          setCourses(coursesData.filter(course => course)); 
        }
      } catch (error) {
        console.error('Error fetching top courses:', error);
      }
    };

    fetchTopCourses();

    const timer = setInterval(fetchTopCourses, 30000); //Atualiza a cada 30 segundos
    return () => {
      clearInterval(timer);
    };
  }, []);

  //Cada código será usado para pegar o nome da disciplina referente
  const fetchCourseName = async (code) => {
    try {
      const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`);
      if (response.ok) {
        const { code, name } = await response.json();
        return [code, name];
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
    return null;
  };

  //Se não houver reviews, a seção não deve aparecer
  if (courses.length === 0) {
    return null; 
  }

  //Configurações do carrossel
  const settings = {
    dots: true,
    infinite: courses.length > 1,
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
    <div data-cy="topCoursesSection">
      <h2 className={styles.heading}>Em Alta</h2>
      <Slider {...settings} className={styles.carousel}>
        {courses.map((course, index) => (
          course && (
            <div key={index} data-cy="topCoursesCard">
              <CardTopCourse courseCode={course[0]} courseName={course[1]}/>
            </div>
          )
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;