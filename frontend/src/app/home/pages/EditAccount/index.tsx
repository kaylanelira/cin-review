
import { useAuth } from "../../context/AuthContext/AuthContext";
import styles from "./index.module.css";
import EditLabelValue from '../../../../shared/components/EditLabelValue';
import { useEffect, useState } from "react";
import Button from "../../../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";

const EditAccount = () => {
  const { user, login } = useAuth();

  // Edição
  const [editedUser, setEditedUser] = useState({ ...user });

  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    try {
      if (user) {
        const token = localStorage.getItem('access_token');

        // evita enviar string vazia para o servidor
        const sanitizedUser = Object.fromEntries(
          Object.entries(editedUser).map(([key, value]) => [key, value !== '' ? value : null])
        );

        const updatedUser = { ...user, ...sanitizedUser };
        
        const response = await fetch(
          `http://localhost:8000/user/update_user/${user.username}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
          }
        );
    
        if (response.status === 200) {
          const updatedUserData = await response.json();
          setEditedUser(updatedUserData);

          setSuccessMessage('Usuário editado com sucesso!');
          setErrorMessage('');

          // mantém o usuário atualizado
          login(updatedUser);

          navigate('/profile')
        } else {
          const errorData = await response.json();
          setSuccessMessage('');
          setErrorMessage('Erro ao editar usuário: ' + errorData.detail);
        }
      } else {
        console.log('Erro: user nulo na edição');
      }
    } catch (error) {
      console.error('Erro atualizando perfil:', error);
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('access_token');

    try {
      if (user) {
        const response = await fetch('http://localhost:8000/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          console.error('Falha em recuperar usuário:', response.statusText);
        }
      } else {
        console.log('User nulo');
      }
    } catch (error) {
      console.error('Falha em recuperar usuário:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  // Verificação se as informações do usuário estão disponíveis
  if (!user) {
    navigate('/create-account')
    return null
  }

  return (
    <section className={styles.container}>
      <Navbar/>

      <h1 className={styles.title}>EDITAR PERFIL</h1>
      <div className={styles.profileContainer}>

        <EditLabelValue id="edit-account-name" propertyName="name" label="Nome" value={user.name} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue id="edit-account-surname" propertyName="surname" label="Sobrenome" value={user.surname || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue id="edit-account-username" propertyName="username" label="Nome de Usuário" value={user.username} editedUser={editedUser} setEditedUser={setEditedUser}/>
        <EditLabelValue id="edit-account-email" propertyName="email" label="Email" value={user.email} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue id="edit-account-password" propertyName="password" label="Senha" value={user.password} editedUser={editedUser} setEditedUser={setEditedUser} type="password"/>
        <EditLabelValue id="edit-account-repeated-password" propertyName="repeated_password" label="Repita a Senha" value={user.repeated_password} editedUser={editedUser} setEditedUser={setEditedUser} type="password"/>
        <EditLabelValue id="edit-account-phone-number" propertyName="phone_number" label="Número de Telefone" value={user.phone_number || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue id="edit-account-interest" propertyName="field_of_interest" label="Área de Interesse" value={user.field_of_interest || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        
        {error_message && <p className={styles.errorMessage}>{error_message}</p>}
        {success_message && <p className={styles.successMessage}>{success_message}</p>}

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button data-cy="cancel" onClick={() => navigate('/profile')}>
            Cancelar Edição
          </Button>
          <Button data-cy="save" onClick={handleSaveChanges}>
            Salvar Alterações
          </Button>
        </div>
        
      </div>
    </section>
  );
  
};

export default EditAccount;
