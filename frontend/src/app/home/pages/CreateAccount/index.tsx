import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../context/HomeContext";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input/input";

const CreateAccount = () => {
  const { state, prevState, service } = useContext(HomeContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestFormType>({
    resolver: zodResolver(TestFormSchema),
  });

  const onSubmit: SubmitHandler<TestFormType> = async (body) => {
    service.createTest(body);
    reset();
  };

  useEffect(() => {
    if (
      state.createTestRequestStatus !== prevState?.createTestRequestStatus &&
      state.createTestRequestStatus.isSuccess()
    ) {
      alert("Teste criado com sucesso!");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>CADASTRO DE USUÁRIO</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <Input text="NOME"/>
          <Input text="SOBRENOME"/>
          <Input text="NOME DE USUÁRIO"/>
          <Input text="E-MAIL"/>
          <Input text="SENHA"/>
          <Input text="REPITA A SENHA"/>
          <Input text="NÚMERO DE TELEFONE"/>
          <Input text="ÁREA DE INTERESSE"/>
        </div>

        <Button data-cy="create" type="submit">
          Cadastrar
        </Button>
      </form>
      <p>
        Já tem uma conta? Faça{' '}
        <Link data-cy="view-tests" to="/tests">
          LOGIN
        </Link>
      </p>
    </section>
  );
};

export default CreateAccount;
