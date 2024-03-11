import React from 'react';
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom
import styles from './DisciplineCard.module.css';

const DisciplineCard = ({ discipline }) => {
  return (
    <Link to={`/edit-discipline/${discipline.code}`} className={styles.card}> 
      <h3>{discipline.name} - {discipline.code}</h3>
      <p>{discipline.department}</p>
      <p><strong>Semestre:</strong> {discipline.semester}</p>
      <p><strong>Professor:</strong> {discipline.professor}</p>
      <p>{discipline.description}</p>
    </Link>
  );
};

export default DisciplineCard;
