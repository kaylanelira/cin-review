import { useEffect } from 'react';
import { useAuth } from "../../context/AuthContext/AuthContext";
import styles from "./index.module.css";
import Button from '../../../../shared/components/Button';
import { useNavigate } from 'react-router-dom';
import ShowLabelValue from '../../../../shared/components/ShowLabelValue';
import Navbar from '../../components/Navbar/navbar';

const AccountProfile = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const openDeleteModal = () => {
    navigate('/delete-account')
  };
  
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

      if (response.status !== 200) {
        console.error('Falha em localizar usuário no servidor:', response.statusText);
      }
    } catch (error) {
      console.error('Falha em localizar usuário:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  // Verificação se as informações do usuário estão disponíveis
  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <section className={styles.container}>
      <Navbar/>

      <h1 className={styles.title}>PERFIL</h1>
      <div className={styles.profileContainer}>

        <ShowLabelValue label="Nome" value={user.name} />
        <ShowLabelValue label="Sobrenome" value={user.surname || 'Não informado'} />
        <ShowLabelValue label="Nome de Usuário" value={user.username}/>
        <ShowLabelValue label="Email" value={user.email} />
        <ShowLabelValue label="Número de Telefone" value={user.phone_number || 'Não informado'} />
        <ShowLabelValue label="Área de Interesse" value={user.field_of_interest || 'Não informado'} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button data-cy="create" onClick={handleLogout}>
            Logout
          </Button>
          <Button data-cy="create" onClick={openDeleteModal}>
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
