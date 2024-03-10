import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar'; 
import styles from './EditDisciplinePage.module.css'; // Importa o arquivo de estilo

const EditDisciplinePage = () => {
  let { code } = useParams();
  let navigate = useNavigate();
  const [discipline, setDiscipline] = useState({
    name: '',
    code: '',
    department: '',
    semester: '',
    professor: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDisciplineDetails(code);
      if (data) {
        setDiscipline(data);
      }
    };

    fetchData();
  }, [code]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscipline((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/discipline/code/${discipline.code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discipline),
    });

    if (response.ok) {
      navigate('/disciplines');
    } else {
      console.error('Failed to update discipline');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8000/discipline/by_code/${discipline.code}`, {
      method: 'DELETE',
    });

    navigate('/disciplines');
  };

  return (
    <div className={styles.container}> {/* Adiciona um container para aplicar o estilo de fundo */}
      <Navbar/>
      <div className={styles.editCard}>
        <h2>Editando Disciplina {discipline.code}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label>
              Nome:
              <input type="text" name="name" value={discipline.name} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>
              Código:
              <input type="text" name="code" value={discipline.code} readOnly style={{ color: 'gray', backgroundColor: '#f0f0f0' }} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>
              Departamento:
              <input type="text" name="department" value={discipline.department} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>
              Semestre:
              <input type="text" name="semester" value={discipline.semester} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>
              Professor:
              <input type="text" name="professor" value={discipline.professor} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.formField}>
            <label>
              Descrição:
              <textarea name="description" value={discipline.description} onChange={handleChange} />
            </label>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" onClick={handleSubmit} className={styles.editButton}>
              Confirmar Edição
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Excluir cadeira
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDisciplinePage;

async function fetchDisciplineDetails(code) {
  const response = await fetch(`http://localhost:8000/discipline/by_code/${code}`);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error(`Failed to fetch discipline details for discipline with code: "${code}"`);
    return null;
  }
}
