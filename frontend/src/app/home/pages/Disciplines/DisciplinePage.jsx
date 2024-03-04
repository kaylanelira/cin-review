import React, { useState, useEffect } from 'react';
import DisciplineList from '../../components/Disciplines/DisciplineList'; // Caminho ajustado conforme necessário
import styles from './DisciplinePage.module.css'; // Importa o arquivo de estilos como um módulo

const DisciplinesPage = () => {
  // Mock data das disciplinas
  const [disciplines, setDisciplines] = useState([
    {
      id: 1,
      name: 'Matemática',
      code: 'MAT101',
      department: 'Ciências Exatas',
      semester: 1,
      professor: 'Prof. Maria',
      description: 'Introdução à Matemática, à física quântica, à fisica normal e à física não newtoniana. Além disso, vamos aprender sobre as proezas de Napoleão Bonaparte.'
    },
    {
      id: 2,
      name: 'História',
      code: 'HIS101',
      department: 'Humanas',
      semester: 1,
      professor: 'Prof. João',
      description: 'História Antiga, história nova e história chata.'
    },
    {
      id: 3,
      name: 'Biologia',
      code: 'BIO101',
      department: 'Ciências Biológicas',
      semester: 1,
      professor: 'Prof. Ana',
      description: 'Fundamentos da Biologia, fundamentos das plantas, dos bichos e dos legumes.'
    },
    {
      id: 4,
      name: 'Química',
      code: 'QUI101',
      department: 'Ciências Exatas',
      semester: 1,
      professor: 'Prof. Carlos',
      description: 'Química Geral, química orgânica, quimica, explosões e coisas do tipo.'
    },
    {
      id: 5,
      name: 'Literatura',
      code: 'LIT101',
      department: 'Humanas',
      semester: 1,
      professor: 'Prof. Teresa',
      description: 'Introdução à Literatura Brasileira, americana, européia, asiática e URSAL.'
    },
    {
      id: 6,
      name: 'Física',
      code: 'FIS101',
      department: 'Ciências Exatas',
      semester: 1,
      professor: 'Prof. Roberto',
      description: 'Física Clássica'
    },
    {
      id: 7,
      name: 'Programação',
      code: 'PROG101',
      department: 'Tecnologia da Informação',
      semester: 1,
      professor: 'Prof. Silvia',
      description: 'Introdução à Programação, python, c++, c#, haskell, javascript, ruby (on rails e sem rails), html, css, assembly, react, angular e obsidian.'
    },
    {
      id: 8,
      name: 'Filosofia',
      code: 'FIL101',
      department: 'Humanas',
      semester: 1,
      professor: 'Prof. Marcos',
      description: 'Pensamento Filosófico, política socioeconomica dinamarquesa.'
    },
  ]);

  useEffect(() => {
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disciplinas</h1>
      <DisciplineList disciplines={disciplines} />
    </div>
  );
};

export default DisciplinesPage;
