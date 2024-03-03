import styles from "./index.module.css";

type InputProps = {
  text: string
}

const Input = (InputProps) => {
  return (
    <input
      className={styles.formInput}
      placeholder={InputProps.text}
    />
  );
};

{/* <input
  data-cy="input-name"
  {...register("name")}
  placeholder="Digite o nome"
  className={styles.formInput}
/>
{errors.name && (
  <span data-cy="input-name-error" className={styles.formError}>
    {errors.name.message}
  </span>
)} */}

export default Input;
