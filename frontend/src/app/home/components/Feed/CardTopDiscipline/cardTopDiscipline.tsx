import styles from './cardTopDiscipline.module.css';
import { Link } from 'react-router-dom';

const CardTopCourse = ({ courseCode, courseName }) => {
  return (
    <Link to={`/course/${courseCode}`} style={{ textDecoration: 'none' }}>        
    <div className={styles.card}>
      <div className={styles.course}>{courseName}</div>
    </div>
    </Link>
  );
};

export default CardTopCourse;