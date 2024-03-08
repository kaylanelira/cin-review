import React, { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext/AuthContext";
import styles from "./index.module.css";
import LabelValue from '../../../../shared/components/LabelValue';
import Button from '../../../../shared/components/Button';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';

const AccountProfile = () => {
  const { user, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUserProfile(parsedUser);

    try {
      console.log(localStorage);
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

    fetchUserProfile();
  }, [user]);
  // Verificação se as informações do usuário estão disponíveis
  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <section className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>PERFIL</h1>
      <div className={styles.profileContainer}>
        <LabelValue label="Nome" value={user.name || 'Não informado'} />
        <LabelValue label="Sobrenome" value={user.surname || 'Não informado'} />
        <LabelValue label="Nome de Usuário" value={user.username || 'Não informado'} />
        <LabelValue label="Email" value={user.email || 'Não informado'} />
        <LabelValue label="Número de Telefone" value={user.phoneNumber || 'Não informado'} />
        <LabelValue label="Área de Interesse" value={user.fieldOfInterest || 'Não informado'} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button data-cy="create" onClick={logout}>
            Logout
          </Button>
          <Button data-cy="create" onClick={logout}>
            Deletar Perfil
          </Button>
          <Button data-cy="create" onClick={logout}>
            Editar Perfil
          </Button>
        </div>
      </div>
    </section>
  );
  
};

export default AccountProfile;
