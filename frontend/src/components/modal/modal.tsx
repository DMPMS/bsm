import { useEffect, useRef, type ReactNode } from "react";
import Spinner from "../spinner/spinner";
import styles from "./modal.module.css";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";
import { ModalSizeEnum } from "../../enums/ModalSize.enum";

interface ModalProps {
  title: string;
  children?: ReactNode;
  isOpen: boolean;
  loading?: boolean;
  size?: ModalSizeEnum;
  danger?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel: () => void;
  cancelText?: string;
}

const Modal = ({
  title,
  children,
  isOpen,
  loading = false,
  size = ModalSizeEnum.Small,
  danger = false,
  onConfirm,
  confirmText = "Confirmar",
  onCancel,
  cancelText = "Cancelar",
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

        onCancel();
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
      <div
        className={styles.cardModal}
        style={{ "--size": size } as React.CSSProperties}
      >
        <h3 className={styles.h3}>{title}</h3>
        {children && <div className={styles.children}>{children}</div>}
        <div className={styles.actions}>
          <button
            ref={cancelButtonRef}
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            disabled={loading}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              ref={confirmButtonRef}
              type="button"
              className={`${styles.button} ${styles.confirmButton} ${
                danger
                  ? styles.confirmButtonDanger
                  : styles.confirmButtonPrimary
              }`}
              disabled={loading}
              onClick={onConfirm}
            >
              <span
                className={`${styles.buttonContent} ${
                  loading && styles.buttonContentLoading
                }`}
              >
                {confirmText}
                {loading && <Spinner size={12} className={styles.spinner} />}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
