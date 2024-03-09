import React from 'react';
import Modal from 'react-modal';
import styles from "./index.module.css";

const ModalComponent = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
