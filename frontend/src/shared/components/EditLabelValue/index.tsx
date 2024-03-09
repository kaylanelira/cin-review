import styles from "./index.module.css";

const EditLabelValue = ({ propertyName, label, value, editedUser, setEditedUser }) => {
  const isValueEmpty = !value && value !== 0;

  return (
    <div className={styles.labelValue}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>
        <input
          className={styles.formInput}
          type="text"
          defaultValue={isValueEmpty ? 'Não informado' : editedUser[propertyName]}
          onChange={(e) =>
            setEditedUser({
              ...editedUser,
              [propertyName]: e.target.value,
            }) 
          }
        />
      </div>
    </div>
  );
};

export default EditLabelValue;
