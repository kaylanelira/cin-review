import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar'; 
import styles from './EditDisciplinePage.module.css'; // Reutilize o estilo existente

const AddDisciplinePage = () => {
  let navigate = useNavigate();
  const [discipline, setDiscipline] = useState({
    name: '',
    code: '',
    department: '',
    semester: '',
    professor: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscipline(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui, implemente a lógica para adicionar uma nova disciplina
    console.log(discipline); // Exemplo de ação, substitua pela sua lógica de adição
    navigate('/disciplines'); // Redireciona o usuário para a lista de disciplinas após a adição
  };

  return (
    <div className={styles.container}> {/* Adicionado o container para aplicar o estilo de fundo e altura */}
    <Navbar/>
      <div className={styles.editCard}>
        <h2>Adicionar Nova Disciplina</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label>Nome:
              <input type="text" name="name" value={discipline.name} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>Código:
              <input type="text" name="code" value={discipline.code} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>Departamento:
              <input type="text" name="department" value={discipline.department} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>Semestre:
              <input type="text" name="semester" value={discipline.semester} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>Professor:
              <input type="text" name="professor" value={discipline.professor} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>Descrição:
              <textarea name="description" value={discipline.description} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.editButton}>Confirmar Adição</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDisciplinePage;
