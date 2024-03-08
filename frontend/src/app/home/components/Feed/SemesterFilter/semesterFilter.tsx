import { useState } from 'react';
import styles from "./semesterFilter.module.css";

const Filter = ({ onSelectChange }) => {
  // Estado para controlar o valor selecionado no dropdown
  const [selectedSemester, setSelectedSemester] = useState('');

  // Manipulador de evento para lidar com a mudança de seleção no dropdown
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    setSelectedSemester(selectedValue);
    onSelectChange(selectedValue);
  };
 
  return (
    <div className={styles.filter}>
      <select id="semester" value={selectedSemester} onChange={handleSelectChange} className={styles.filterSelect}>
        <option value="">Filtre por semestre...</option>
        <option value="1">1° Semestre</option>
        <option value="2">2° Semestre</option>
        <option value="3">3° Semestre</option>
        <option value="4">4° Semestre</option>
        <option value="5">5° Semestre</option>
        <option value="6">6° Semestre</option>
        <option value="7">7° Semestre</option>
        <option value="8">8° Semestre</option>
        <option value="9">9° Semestre</option>
        <option value="10">10° Semestre</option>
      </select>
    </div>
  );
};

export default Filter;
