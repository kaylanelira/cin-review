import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardCourse from '../../components/Feed/CardDiscipline/cardDiscipline';
import Navbar from '../../components/Navbar/navbar';
import styles from './index.module.css'

const SearchResults = () => {
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 15;

  //Buscar disciplinas com trecho especificado em seu nome
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:8000/discipline/get_disciplines_by_search/${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  //Define quantas disciplinas serão exibidas, se há necessidade de outra "seção"
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = searchResults.slice(indexOfFirstCourse, indexOfLastCourse);
  
  const handleClick = (type) => {
    if (type === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <section className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Resultados da Pesquisa</h1>
      <div className="courses">
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
            <h1  style={{ marginLeft: '2vw' }}>Nenhuma disciplina cadastrada.</h1>
          )
        }
      </div>
      <div>
          {currentPage > 1 && <button onClick={() => handleClick('prev')} className={styles.button}>Anterior</button>}
          {searchResults.length > currentPage * coursesPerPage && <button onClick={() => handleClick('next')} className={styles.button}>Próxima</button>}
        </div>
      </section>
    </div>     
  );
};

export default SearchResults;
