
import { useAuth } from "../../context/AuthContext/AuthContext";
import styles from "./index.module.css";
import EditLabelValue from '../../../../shared/components/EditLabelValue';
import { useEffect, useState } from "react";
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";
import { useNavigate } from "react-router-dom";
import InputRequired from "../../../../shared/components/InputRequired";
import Navbar from "../../components/Navbar/navbar";

const EditAccount = () => {
  const { user, login } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

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
          Object.entries(editedUser).filter(([_, value]) => value !== '')
        );

        const updatedUser = { ...user, ...sanitizedUser };

        // TODO apagar depoiss
        console.log(updatedUser)
        
        const response = await fetch(
          `http://localhost:8000/user/update_user/${user.id}`,
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

          setUserProfile(updatedUserData);
          setSuccessMessage('Usuário editado com sucesso!');
          setErrorMessage('');
          login(updatedUser);
          navigate('/profile')
        } else {
          setSuccessMessage('');
          setErrorMessage('Erro ao editar usuário: ' + response.statusText);
        }
      } else {
        console.log('Erro: user nulo na edição');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
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

        if (response.status === 200) {
          const userData = await response.json();
          setUserProfile(userData);
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } else {
        console.log('User nulo');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
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
        <EditLabelValue propertyName="name" label="Nome" value={user.name || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue propertyName="surname" label="Sobrenome" value={user.surname || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue propertyName="username" label="Nome de Usuário" value={user.username || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser}/>
        <EditLabelValue propertyName="email" label="Email" value={user.email || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue propertyName="phone_number" label="Número de Telefone" value={user.phone_number || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        <EditLabelValue propertyName="field_of_interest" label="Área de Interesse" value={user.field_of_interest || 'Não informado'} editedUser={editedUser} setEditedUser={setEditedUser} />
        
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
