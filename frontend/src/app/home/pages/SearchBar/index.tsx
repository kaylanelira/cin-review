import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardDiscipline from '../../components/Feed/CardDiscipline/cardDiscipline';
import Navbar from '../../components/Navbar/navbar';
import styles from './index.module.css'

const SearchResults = () => {
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const disciplinesPerPage = 15;

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

  
  const indexOfLastDiscipline = currentPage * disciplinesPerPage;
  const indexOfFirstDiscipline = indexOfLastDiscipline - disciplinesPerPage;
  const currentDisciplines = searchResults.slice(indexOfFirstDiscipline, indexOfLastDiscipline);
  
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
      <div className={styles.disciplines}>
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
          {searchResults.length > currentPage * disciplinesPerPage && <button onClick={() => handleClick('next')} className={styles.button}>Próxima</button>}
        </div>
      </section>
    </div>     
  );
};

export default SearchResults;
