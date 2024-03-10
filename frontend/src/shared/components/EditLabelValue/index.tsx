import { useState } from "react";
import styles from "./index.module.css";

const EditLabelValue = (props) => {
  const isValueEmpty = !props.value && props.value !== 0;
  const [isPasswordVisible] = useState(false);

  return (
    <div className={styles.labelValue}>
      <div className={styles.label}>{props.label}:</div>
      <div className={styles.value}>
        <input
          id={props.id}
          className={styles.formInput}
          type={isPasswordVisible ? "text" : props.type || "text"}
          value={isValueEmpty ? 'Não informado' : props.editedUser[props.propertyName]}
          onChange={(e) =>
            props.setEditedUser({
              ...props.editedUser,
              [props.propertyName]: e.target.value,
            }) 
          }
        />
      </div>
    </div>
  );
};

export default EditLabelValue;
