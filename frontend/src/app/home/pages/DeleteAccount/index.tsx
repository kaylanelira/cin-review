import Modal from "react-modal";

import { useAuth } from "../../context/AuthContext/AuthContext";
import styles from "./index.module.css";
import { useState } from "react";
import Button from "../../../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import ModalComponent from "../../../../shared/components/Modal";
import Input from "../../../../shared/components/Input/input";

Modal.setAppElement('#root');

const DeleteAccount = () => {
  const { user } = useAuth();

  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");

  const [passwordInput, setPasswordInput] = useState("");

  const navigate = useNavigate();

  const closeDeleteModal = () => {
    navigate('/profile');
  };

  const handleDelete = async () => {
    try {
      if (user) {
        const token = localStorage.getItem('access_token');
        
        const response = await fetch(
          `http://localhost:8000/user/delete_user/${user.username}?password=${passwordInput}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
    
        if (response.status === 200) {
          setSuccessMessage('Usuário excluido com sucesso!');
          setErrorMessage('');
          navigate('/create-account')
        } else {
          const errorData = await response.json();
          setSuccessMessage('');
          setErrorMessage(errorData.detail);
        }
      } else {
        console.log('Erro: user nulo na exclusão');
      }
    } catch (error) {
      console.error('Erro excluindo usuário:', error);
    }
  };

  // Verificação se as informações do usuário estão disponíveis
  if (!user) {
    navigate('/create-account')
    return null
  }

  return (
    <section className={styles.container}>
      <Navbar/>

      <div className={styles.modalContainer}>
        <ModalComponent isOpen={true} onRequestClose={() => closeDeleteModal()}>
          <h1 className={styles.title}>Você quer mesmo deletar seu perfil?</h1>
          <h2 className={styles.subtitle}>Não é possível desfazer essa ação</h2>
          <p className={styles.paragraph}>Confirme a exclusão utilizando sua senha</p>
          
          <Input id="delete-account-password" text="Senha" value={passwordInput} setInfo={setPasswordInput} type="password"/>
          
          {error_message && <p className={styles.errorMessage}>{error_message}</p>}
          {success_message && <p className={styles.successMessage}>{success_message}</p>}
          
          <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
            <Button onClick={handleDelete}>Deletar</Button>
            <Button onClick={closeDeleteModal}>Cancelar</Button>
          </div>
        </ModalComponent>
      </div>
    </section>
  );
  
};

export default DeleteAccount;
