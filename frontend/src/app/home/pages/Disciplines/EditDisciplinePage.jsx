import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar'; 
import styles from './EditDisciplinePage.module.css'; // Importa o arquivo de estilo

const EditDisciplinePage = () => {
  let { id } = useParams();
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
    // Supondo que você tenha uma função para buscar os detalhes da disciplina pelo ID
    fetchDisciplineDetails(id).then(data => {
      setDiscipline(data); // Atualiza o estado com os dados recebidos
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscipline(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Supondo que você tenha uma função de atualização
    await updateDiscipline(id, discipline);
    navigate('/disciplines'); // Redireciona o usuário para a lista de disciplinas após a atualização
  };

  const handleDelete = async () => {
    // Supondo que você tenha uma função de exclusão
    await deleteDiscipline(id);
    navigate('/disciplines'); // Redireciona após a exclusão
  };

  return (
    <div className={styles.container}> {/* Adiciona um container para aplicar o estilo de fundo */}
      <Navbar/>
      <div className={styles.editCard}>
        <h2>Editando Disciplina {id}</h2>
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
            <button type="submit" className={styles.editButton}>Confirmar Edição</button>
            <button type="button" onClick={handleDelete} className={styles.deleteButton}>Excluir cadeira</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDisciplinePage;

async function fetchDisciplineDetails(id) {
  // Implemente a lógica para buscar os detalhes da disciplina pelo ID
  return {
    name: 'Nome Exemplo',
    code: 'Código Exemplo',
    department: 'Departamento Exemplo',
    semester: 'Semestre Exemplo',
    professor: 'Professor Exemplo',
    description: 'Descrição Exemplo',
  };
}

async function updateDiscipline(id, discipline) {
  // Implemente a lógica de atualização da disciplina
}

async function deleteDiscipline(id) {
  // Implemente a lógica de exclusão da disciplina
}
