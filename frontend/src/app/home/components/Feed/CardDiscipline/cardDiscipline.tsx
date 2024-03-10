import { Link } from 'react-router-dom'; 
import styles from './cardDiscipline.module.css';
import minus_icon from '../../../assets/minus-icon.png';
import plus_icon from '../../../assets/plus-icon.png';

const CardDiscipline = ({ disciplineCode, disciplineName, semester, added }) => {
  return (
    <Link to={`/course/${disciplineCode}`} style={{ textDecoration: 'none' }}>    
      <div className={styles.card}>
          <div className={styles.discipline}>{disciplineName}</div>
          <div className={styles.cardDisciplineLeft}>
              <div className={styles.semester}>{semester}</div>
              {added ? (
                <img src={minus_icon} alt="Disciplina Adicionada" className={styles.image} />
                ) : (
                  <img src={plus_icon} alt="Disciplina Não Adicionada" className={styles.image} />
                  )}
          </div>
      </div>
    </Link>
  );
};

export default CardDiscipline;