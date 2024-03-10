import styles from "./index.module.css";

const Input = (InputProps) => {
  
  return (
    <input
      id={InputProps.id}
      className={styles.formInput}
      placeholder={InputProps.text}
      type={InputProps.isPasswordVisible ? "text" : InputProps.type || "text"}
      value={InputProps.value}
      onChange={(e) => InputProps.setInfo(e.target.value)}
    />
  );
};

export default Input;
