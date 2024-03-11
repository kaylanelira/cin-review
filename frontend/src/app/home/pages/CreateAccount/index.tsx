import styles from "./index.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";

const CreateAccount = () => {

  // user info
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState("");

  // mensagens
  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id: '',
      name,
      surname,
      username,
      email,
      password,
      repeated_password: repeatedPassword,
      phone_number: phoneNumber,
      field_of_interest: fieldOfInterest,
    };

    try {
      const response = await fetch('http://localhost:8000/user/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });


      if (response.status === 201) {
        setSuccessMessage('Usuário cadastrado com sucesso!');
        setErrorMessage('');

        // Redirecionamento para outra página
        navigate("/feed");
      } else {
        const errorData = await response.json();
        setErrorMessage(`Erro ao cadastrar usuário: ${errorData.detail}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação POST:', error);
      setErrorMessage('Erro ao cadastrar usuário. Tente novamente mais tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <section className={styles.container}>
      <Navbar />

      <h1 className={styles.title}>CADASTRO DE USUÁRIO</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>

        <div className={styles.formInputContainer}>
          <Input id="create-account-name" text="Nome" value={name} setInfo={setName}/>
          <Input id="create-account-surname" text="Sobrenome" value={surname} setInfo={setSurname}/>
          <Input id="create-account-username" text="Nome de Usuário" value={username} setInfo={setUsername}/>
          <Input id="create-account-email" text="E-mail" value={email} setInfo={setEmail}/>
          <Input id="create-account-password" text="Senha" value={password} setInfo={setPassword} type="password"/>
          <Input id="create-account-repeated-password" text="Repita a Senha" value={repeatedPassword} setInfo={setRepeatedPassword} type="password"/>
          <Input id="create-account-phone-number" text="Número de Telefone" value={phoneNumber} setInfo={setPhoneNumber}/>
          <Input id="create-account-interest" text="Área de Interesse" value={fieldOfInterest} setInfo={setFieldOfInterest}/>

          {error_message && <p className={styles.errorMessage}>{error_message}</p>}
          {success_message && <p className={styles.successMessage}>{success_message}</p>}
        
        </div>

        <Button data-cy="create" type="submit">
          Cadastrar
        </Button>
        
      </form>
      <p>
        Já tem uma conta? Faça{' '}
        <Link data-cy="view-tests" to="/login">
          LOGIN
        </Link>
      </p>
    </section>
  );
};

export default CreateAccount;