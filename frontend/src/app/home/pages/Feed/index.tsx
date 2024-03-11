import { useState, useEffect } from 'react';
import styles from "./index.module.css";
import Navbar from '../../components/Navbar/navbar'; 
import CardCourse from '../../components/Feed/CardDiscipline/cardDiscipline'; 
import RecentReviewCarousel from '../../components/Feed/RecentReviewCarousel/recentReviewCarousel'; 
import TopCoursesCarousel from '../../components/Feed/TopDisciplinesCarousel/topDisciplinesCarousel'; 
import SemesterFilter from '../../components/Feed/SemesterFilter/semesterFilter'

const Feed = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState('');
  const coursesPerPage = 6;

  //Pegar as disciplinas em ordem alfabética. Exibe-se no máximo seis, depois aparece um botão para avançar.
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/discipline/get_all_alphabetically'); 
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCourses(data); 
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();

    const timer = setInterval(fetchCourses, 10000); //A cada 10 segundos refaz a requisição (caso algo tenha mudado)
    return () => {
      clearInterval(timer);
    };
  }, []);

  //Chamar a função de filtrar por semestre
  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };
  
  //Define quantas disciplinas serão exibidas, se há necessidade de outra "seção"
  const filteredCourses = selectedSemester ? courses.filter(course => course.semester == selectedSemester) : courses;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleClick = (type) => {
    if (type === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  //Se não houver disciplina cadastrada, nao ha feed
  if (courses.length === 0) {
    return (
      <section className={styles.container}>
        <h1>Página em manutenção. Aguarde o cadastro de disciplinas.</h1>
      </section>
    ) ;
  }

  return (
    <div>
      <section className={styles.container}>
      <Navbar />
      <div className='recentReviews'>
        <RecentReviewCarousel/>
      </div> 
      <div className='topCourses'>
        <TopCoursesCarousel />
      </div>
      <h2 className={styles.heading}>Cadeiras</h2>
      <div className='courses'>
        <SemesterFilter onSelectChange={handleSemesterChange} className='filtro'/>
        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
          <div key={index}>
            <CardCourse 
              courseCode={course.code}
              courseName={course.name}
              semester={`${course.semester}° Período`}
              added={true}
              />
          </div>
          ))
          ) : (
            <h1 style={{ marginLeft: '2vw' }}>Nenhuma disciplina cadastrada.</h1>
          )
        }
      </div>
      <div>
          {currentPage > 1 && <button onClick={() => handleClick('prev')} className={styles.button}>Anterior</button>}
          {filteredCourses.length > currentPage * coursesPerPage && <button onClick={() => handleClick('next')} className={styles.button}>Próxima</button>}
        </div>
      </section>
    </div>
  );
};

export default Feed;