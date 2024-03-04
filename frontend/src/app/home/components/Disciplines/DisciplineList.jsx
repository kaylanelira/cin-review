import React from 'react';
import DisciplineCard from './DisciplineCard';
import AddDisciplineCard from './AddDisciplineCard'; // Importando o novo componente
import styles from './DisciplineCard.module.css';

const DisciplineList = ({ disciplines }) => {
  return (
    <div className={styles.listContainer}>
      {disciplines.map(discipline => (
        <DisciplineCard key={discipline.id} discipline={discipline} />
      ))}
      <AddDisciplineCard /> {/* Adicionando o novo card */}
    </div>
  );
};

export default DisciplineList;
