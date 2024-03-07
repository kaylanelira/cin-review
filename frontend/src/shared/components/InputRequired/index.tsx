import { useState } from "react";
import styles from "./index.module.css";

type InputProps = {
  text: string;
  type?: string; 
  value: string;
  setInfo: (value: string) => void;
}

const InputRequired = (InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  
  return (
    <div>
    <input
      className={styles.formInput}
      placeholder={InputProps.text}
      // type={isPasswordVisible ? "text" : InputProps.type}
      type={isPasswordVisible ? "text" : InputProps.type || "text"} // Use props.type ou "text" como padrão
      value={InputProps.value}
      onChange={(e) => InputProps.setInfo(e.target.value)}
      required
    />
    {/* {InputProps.type === "password" && (
      <button
        type="button"
        className={styles.visibilityToggle}
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? "Ocultar" : "Mostrar"}
      </button>
    )} */}
    </div>
  );
};

export default InputRequired