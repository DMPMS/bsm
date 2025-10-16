import Spinner from "../spinner/spinner";
import styles from "./modal.module.css";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  loading: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const Modal = ({
  title,
  description,
  isOpen,
  loading,
  danger = false,
  onConfirm,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.cardModal}>
        <h3 className={styles.h3}>{title}</h3>
        {description && (
          <text className={styles.description}>{description}</text>
        )}
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.confirmButton} ${
              danger ? styles.confirmButtonDanger : styles.confirmButtonPrimary
            }`}
            disabled={loading}
            onClick={onConfirm}
          >
            <span
              className={`${styles.buttonContent} ${
                loading && styles.buttonContentLoading
              }`}
            >
              <span>Confirmar</span>
              {loading && <Spinner size={12} classname={styles.spinner} />}
            </span>
          </button>

          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            disabled={loading}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
