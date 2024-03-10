import { useState } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import { useAuth } from "../../context/AuthContext/AuthContext";
import Navbar from "../../components/Navbar/navbar";
import Input from "../../../../shared/components/Input/input";

const Login = () => {
  // user info
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new URLSearchParams();
    userData.append('username', username);
    userData.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: userData.toString(),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { access_token, user } = responseData;
        
        localStorage.setItem('access_token', access_token);
        
        // Adiciona as informações do usuário ao estado local
        login(user);

        setSuccessMessage('Login bem-sucedido!');
        setErrorMessage('');
        navigate("/feed");
      } else {
        const errorData = await response.json();
        console.error('Erro no login:', errorData);
        setErrorMessage('Erro no login. Tente novamente.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação POST:', error);
      setErrorMessage('Erro no login. Tente novamente mais tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <section className={styles.container}>
      <Navbar />

      <h1 className={styles.title}>LOGIN</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>

        <div className={styles.formInputContainer}>
          <Input id="username" text="NOME DE USUÁRIO" value={username} setInfo={setUsername}/>
          <Input id="password" text="SENHA" type="password" value={password} setInfo={setPassword}/>
          {error_message && <p className={styles.errorMessage}>{error_message}</p>}
          {success_message && <p className={styles.success}>{success_message}</p>}
        </div>

        <Button data-cy="login" type="submit">
          Entrar
        </Button> 
        
      </form>
      <p>
        Não tem uma conta? Faça{' '}
        <Link data-cy="create-account" to="/create-account">
          CADASTRO
        </Link>
      </p>
    </section>
  );
};

export default Login;
