import { useEffect, useRef } from "react";
import Spinner from "../spinner/spinner";
import styles from "./modal.module.css";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";

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
  const loadingRef = useRef(loading);

  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    if (isOpen) {
      lastActiveElementRef.current = document.activeElement as HTMLElement;

      if (cancelButtonRef.current) {
        cancelButtonRef.current.focus();
      }
    } else if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen || loadingRef.current) return;

    const focusable = [
      cancelButtonRef.current,
      confirmButtonRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (!focusable.length) return;

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    switch (e.key) {
      case KeyboardKeyEnum.Escape:
        e.preventDefault();

        onClose();
        break;
      case KeyboardKeyEnum.Tab:
        e.preventDefault();

        if (!focusable.includes(document.activeElement as HTMLElement)) {
          firstFocusable.focus();
          return;
        }

        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
        } else if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
        }

        break;
      default:
        return;
    }
  };

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
            tabIndex={0}
            ref={cancelButtonRef}
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            disabled={loading}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            tabIndex={0}
            ref={confirmButtonRef}
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
              {loading && <Spinner size={12} className={styles.spinner} />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
