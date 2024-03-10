import styles from './cardTopDiscipline.module.css';
import { Link } from 'react-router-dom';

const CardTopDiscipline = ({ disciplineCode, disciplineName }) => {
  return (
    <Link to={`/discipline/${disciplineCode}`} style={{ textDecoration: 'none' }}>        
    <div className={styles.card}>
      <div className={styles.discipline}>{disciplineName}</div>
    </div>
    </Link>
  );
};

export default CardTopDiscipline;