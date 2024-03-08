import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputRequired from "../../../../shared/components/InputRequired";

const CreateAccount = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");
  const { state, prevState } = useContext(HomeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      state.createTestRequestStatus !== prevState?.createTestRequestStatus &&
      state.createTestRequestStatus.isSuccess()
    ) {
      alert("Teste criado com sucesso!");
    }
  }, [state, prevState]);

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
        navigate("/tests")
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
      <h1 className={styles.title}>CADASTRO DE USUÁRIO</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formInputContainer}>
          <InputRequired text="Nome" value={name} setInfo={setName}/>
          <Input text="Sobrenome" value={surname} setInfo={setSurname}/>
          <InputRequired text="Nome de Usuário" value={username} setInfo={setUsername}/>
          <InputRequired text="E-mail" value={email} setInfo={setEmail}/>
          <InputRequired text="Senha" value={password} setInfo={setPassword} type="password"/>
          <InputRequired text="Repita a Senha" value={repeatedPassword} setInfo={setRepeatedPassword} type="password"/>
          <Input text="Número de Telefone" value={phoneNumber} setInfo={setPhoneNumber}/>
          <Input text="Área de Interesse" value={fieldOfInterest} setInfo={setFieldOfInterest}/>

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