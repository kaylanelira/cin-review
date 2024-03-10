import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./index.module.css";
import Navbar from '../../components/Navbar/navbar'; 
import CardDiscipline from '../../components/Feed/CardDiscipline/cardDiscipline'; 
import RecentReviewCarousel from '../../components/Feed/RecentReviewCarousel/recentReviewCarousel'; 
import TopDisciplinesCarousel from '../../components/Feed/TopDisciplinesCarousel/topDisciplinesCarousel'; 
import SemesterFilter from '../../components/Feed/SemesterFilter/semesterFilter'

const Feed = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState('');
  const disciplinesPerPage = 6;

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await fetch('http://localhost:8000/discipline/get_all_alphabetically'); 
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setDisciplines(data); 
        }
      } catch (error) {
        console.error('Error fetching disciplines:', error);
      }
    };

    fetchDisciplines();

    const timer = setInterval(fetchDisciplines, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };
  
  const filteredDisciplines = selectedSemester ? disciplines.filter(discipline => discipline.semester == selectedSemester) : disciplines;
  const indexOfLastDiscipline = currentPage * disciplinesPerPage;
  const indexOfFirstDiscipline = indexOfLastDiscipline - disciplinesPerPage;
  const currentDisciplines = filteredDisciplines.slice(indexOfFirstDiscipline, indexOfLastDiscipline);

  const handleClick = (type) => {
    if (type === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  if (disciplines.length === 0) {
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
      <div className={styles.carousel}>
        <RecentReviewCarousel />
      </div> 
      <div className={styles.carousel}>
        <TopDisciplinesCarousel />
      </div>
      <h2 className={styles.heading}>Cadeiras</h2>
      <div className={styles.disciplines}>
        <SemesterFilter onSelectChange={handleSemesterChange}/>
        {currentDisciplines.length > 0 ? (
          currentDisciplines.map((discipline, index) => (
          <div key={index}>
            <CardDiscipline 
              disciplineCode={discipline.code}
              disciplineName={discipline.name}
              semester={`${discipline.semester}° Período`}
              added={true}
              />
          </div>
          ))
          ) : (
            <h1  style={{ marginLeft: '2vw' }}>Nenhuma disciplina cadastrada.</h1>
          )
        }
      </div>
      <div>
          {currentPage > 1 && <button onClick={() => handleClick('prev')} className={styles.button}>Anterior</button>}
          {filteredDisciplines.length > currentPage * disciplinesPerPage && <button onClick={() => handleClick('next')} className={styles.button}>Próxima</button>}
        </div>
      </section>
    </div>
  );
};

export default Feed;