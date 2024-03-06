import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './DisciplineCard.module.css';

const AddDisciplineCard = () => {
  return (
    <Link to="/add-discipline" className={styles.addCard} style={{ textDecoration: 'none' }}> 
      <strong style={{ fontSize: '1.5em', color: '#feefdd' }}>Adicionar nova disciplina (+)</strong>
    </Link>
  );
};

export default AddDisciplineCard;
