import { Link } from 'react-router-dom'; 
import styles from './cardDiscipline.module.css';
import minus_icon from '../../../assets/minus-icon.png';
import plus_icon from '../../../assets/plus-icon.png';

const CardCourse = ({ courseCode, courseName, semester, added }) => {
  return (
    <Link to={`/course/${courseCode}`} style={{ textDecoration: 'none' }}>    
      <div className={styles.card} data-cy="coursesCard">
          <div className={styles.course}>{courseName}</div>
          <div className={styles.cardCourseLeft}> 
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

export default CardCourse;