import { Link } from 'react-router-dom'; 
import styles from './cardDiscipline.module.css';
import minus_icon from '../../../assets/minus-icon.png';
import plus_icon from '../../../assets/plus-icon.png';

const CardDiscipline = ({ discipline, semester, added }) => {
  return (
    <div className={styles.card}>
        <div className={styles.discipline}>{discipline}</div>
        <div className={styles.cardDisciplineLeft}>
            <div className={styles.semester}>{semester}</div>
            {added ? (
                <Link to="/tests"><img src={minus_icon} alt="Disciplina Adicionada" className={styles.image} /></Link>
            ) : (
                <Link to="/tests"><img src={plus_icon} alt="Disciplina Não Adicionada" className={styles.image} /></Link>
            )}
        </div>
    </div>
  );
};

export default CardDiscipline;