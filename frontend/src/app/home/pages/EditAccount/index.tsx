import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";
import { useNavigate } from "react-router-dom";
import InputRequired from "../../../../shared/components/InputRequired";

const EditAccount = () => {
  const token = localStorage.getItem('access_token');
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
    phoneNumber: "",
    fieldOfInterest: "",
  });
  const [error_message, setErrorMessage] = useState("");
  const [success_message, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (fieldName, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          const errorData = await response.json();
          setErrorMessage(`Error: ${errorData.detail}`);
          setSuccessMessage('');
        }
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Perfil</h1>
      <form className={styles.formContainer}>
        <div className={styles.formInputContainer}>
          <InputRequired
            text="NOME"
            value={userData.name}
            setInfo={(value) => handleInputChange("name", value)} 
          />
          <Input 
            text="SOBRENOME" 
            value={userData.surname} 
            setInfo={(value) => handleInputChange("surname", value)} 
          />
          <InputRequired 
            text="NOME DE USUÁRIO" 
            value={userData.username} 
            setInfo={(value) => handleInputChange("username", value)} 
          />
          {/* ... outros campos do formulário */}
        </div>
      </form>
      <div>
        <Button data-cy="update" type="submit">
          Atualizar Perfil
        </Button>
        <Button data-cy="delete" type="submit">
          Deletar Perfil
        </Button>
      </div>
    </section>
  );
};

export default EditAccount;