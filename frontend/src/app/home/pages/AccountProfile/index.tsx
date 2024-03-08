import { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext/AuthContext";
import styles from "./index.module.css";
import Button from '../../../../shared/components/Button';
import { useNavigate } from 'react-router-dom';
import ShowLabelValue from '../../../../shared/components/ShowLabelValue';

const AccountProfile = () => {
  const { user, login, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
  }; 

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('access_token');

    try {
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
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    console.log('User really changed:', user?.phone_number);
  }, [user]);

  // Verificação se as informações do usuário estão disponíveis
  if (!user) {
    navigate('/create-account')
    return null
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>PERFIL</h1>
      <div className={styles.profileContainer}>
        <ShowLabelValue label="Nome" value={user.name || 'Não informado'} />
        <ShowLabelValue label="Sobrenome" value={user.surname || 'Não informado'} />
        <ShowLabelValue label="Nome de Usuário" value={user.username || 'Não informado'}/>
        <ShowLabelValue label="Email" value={user.email || 'Não informado'} />
        <ShowLabelValue label="Número de Telefone" value={user.phone_number || 'Não informado'} />
        <ShowLabelValue label="Área de Interesse" value={user.field_of_interest || 'Não informado'} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button data-cy="create" onClick={handleLogout}>
            Logout
          </Button>
          <Button data-cy="create" onClick={logout}>
            Deletar Perfil
          </Button>
          <Button data-cy="create" onClick={() => navigate('/edit-account')}>
            Editar Perfil
          </Button>
        </div>
      </div>
    </section>
  );
  
};

export default AccountProfile;
