import React, { useState, useRef, useEffect } from "react";
import styles from "./selectMultiple.module.css";
import TriangleDownIcon from "../icons/triangleDown.icon";
import CloseIcon from "../icons/close.icon";
import { FieldStateEnum } from "../../enums/FieldState.enum";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";
import Modal from "../modal/modal";
import MenuIcon from "../icons/menu.icon";
import { ModalSizeEnum } from "../../enums/ModalSize.enum";

interface Option {
  value: string | number;
  name: string;
  display: string | React.ReactNode;
}

interface SelectProps {
  options: Option[];
  values: Array<string | number>;
  onChange: (values: Array<string | number>) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  validationMessage?: string;
  fieldState?: FieldStateEnum;
}

const SelectMultiple = ({
  options,
  values = [],
  onChange,
  placeholder = "Selecione as opções",
  disabled = false,
  allowClear = true,
  validationMessage = "",
  fieldState = FieldStateEnum.Default,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [isKeyboardNavigation, setIsKeyboardNavigation] =
    useState<boolean>(false);
  const [lastInteractionWasKeyboard, setLastInteractionWasKeyboard] =
    useState<boolean>(false);
  const [dropdownUp, setDropdownUp] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((option) =>
    values.includes(option.value)
  );
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayValue = isOpen ? searchValue : "";

  useEffect(() => {
    if (focusedIndex >= 0 && optionsListRef.current) {
      const focusedElement = optionsListRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        if (focusedIndex === 0) {
          optionsListRef.current.scrollTop = 0;
        } else if (focusedIndex === filteredOptions.length - 1) {
          optionsListRef.current.scrollTop =
            optionsListRef.current.scrollHeight;
        } else {
          focusedElement.scrollIntoView({
            block: "nearest",
            behavior: "auto",
          });
        }
      }
    }
  }, [focusedIndex, filteredOptions.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        closeSelect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setLastInteractionWasKeyboard(false);
    const handleKeyDown = () => setLastInteractionWasKeyboard(true);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchValue]);

  useEffect(() => {
    inputRef.current?.setCustomValidity(validationMessage);
    inputRef.current?.reportValidity();
  }, [validationMessage]);

  useEffect(() => {
    checkDropdownDirection();

    window.addEventListener("resize", checkDropdownDirection);

    return () => {
      window.removeEventListener("resize", checkDropdownDirection);
    };
  }, []);

  const checkDropdownDirection = () => {
    if (!selectRef.current) return;

    const rect = selectRef.current.getBoundingClientRect();
    const approxDropdownHeight = 170;
    const spaceBelow = window.innerHeight - rect.bottom;

    setDropdownUp(spaceBelow < approxDropdownHeight);
  };

  const closeSelect = () => {
    setIsOpen(false);
    setSearchValue("");
    setFocusedIndex(-1);
    setIsKeyboardNavigation(false);
  };

  const handleClickSelect = () => {
    if (!disabled) {
      setIsKeyboardNavigation(false);

      if (!isOpen) {
        setIsOpen(true);
        const selectedIndex = filteredOptions.findIndex((option) =>
          values.includes(option.value)
        );
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : -1);
      }

      inputRef.current?.focus();
    }
  };

  const handleClickIcon = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!disabled) {
      if (selectedOptions.length > 0 && allowClear) {
        onChange([]);
        closeSelect();

        return;
      }

      if (isOpen) {
        closeSelect();
      } else {
        setIsOpen(true);
        const selectedIndex = filteredOptions.findIndex((option) =>
          values.includes(option.value)
        );
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : -1);

        inputRef.current?.focus();
      }
    }
  };

  const handleClickButton = () => {
    if (disabled) {
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFocusInput = () => {
    if (!disabled) {
      setIsKeyboardNavigation(lastInteractionWasKeyboard);

      if (!isOpen && lastInteractionWasKeyboard) {
        setIsOpen(true);
        const selectedIndex = filteredOptions.findIndex((option) =>
          values.includes(option.value)
        );
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
    }
  };

  const handlePreventInputBlur = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const toggleValue = (optionValue: string | number) => {
    if (values.includes(optionValue)) {
      onChange(values.filter((value) => value !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  const handleClickOption = (optionValue: string | number) => {
    toggleValue(optionValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    setIsKeyboardNavigation(true);

    switch (e.key) {
      case KeyboardKeyEnum.ArrowDown:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          const selectedIndex = filteredOptions.findIndex((option) =>
            values.includes(option.value)
          );
          setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }

        break;
      case KeyboardKeyEnum.ArrowUp:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          const selectedIndex = filteredOptions.findIndex((option) =>
            values.includes(option.value)
          );
          setFocusedIndex(
            selectedIndex >= 0 ? selectedIndex : filteredOptions.length - 1
          );
        } else {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }

        break;
      case KeyboardKeyEnum.Enter:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          const selectedIndex = filteredOptions.findIndex((option) =>
            values.includes(option.value)
          );
          setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          toggleValue(filteredOptions[focusedIndex].value);
        }

        break;
      case KeyboardKeyEnum.Escape:
        e.preventDefault();

        if (isOpen) {
          closeSelect();
        }

        break;
      case KeyboardKeyEnum.Tab:
        if (isOpen) {
          closeSelect();
        }

        break;
      case KeyboardKeyEnum.Delete:
      case KeyboardKeyEnum.Backspace:
        if (!searchValue && allowClear && selectedOptions.length > 0) {
          e.preventDefault();
          onChange(values.slice(0, -1));
        }

        break;
      default:
        return;
    }
  };

  const handleRemoveOptionModal = (optionValue: string | number) => {
    onChange(values.filter((value) => value !== optionValue));
  };

  return (
    <div ref={selectRef} className={styles.select}>
      <div
        onClick={handleClickSelect}
        className={`${styles.selectHeader} ${
          fieldState === FieldStateEnum.Invalid
            ? styles.selectHeaderInvalid
            : fieldState === FieldStateEnum.Warning
            ? styles.selectHeaderWarning
            : ""
        } ${isOpen ? styles.selectHeaderOpen : ""} ${
          fieldState === FieldStateEnum.Invalid
            ? styles.selectHeaderInvalidOpen
            : fieldState === FieldStateEnum.Warning
            ? styles.selectHeaderWarningOpen
            : ""
        } ${disabled ? styles.selectHeaderDisabled : ""}`}
      >
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder={
            selectedOptions.length === 0
              ? placeholder
              : selectedOptions.length === 1
              ? "1 opção selecionada"
              : `${selectedOptions.length} opções selecionadas`
          }
          value={displayValue}
          onChange={handleChangeInput}
          onFocus={handleFocusInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        {selectedOptions.length > 0 && allowClear ? (
          <CloseIcon onClick={handleClickIcon} size={15} disabled={disabled} />
        ) : (
          <TriangleDownIcon
            onClick={handleClickIcon}
            size={15}
            disabled={disabled}
          />
        )}
      </div>

      <button
        className={styles.button}
        type="button"
        onClick={handleClickButton}
      >
        <MenuIcon
          size={15}
          color="var(--color-gray-1)"
          colorHover="var(--color-gray-1)"
          colorDisabled="var(--color-gray-1)"
        />
      </button>

      {!disabled && (
        <div
          className={`${styles.dropdown} ${
            isOpen ? styles.dropdownVisible : ""
          } ${dropdownUp ? styles.dropdownUp : ""}`}
          onMouseDown={handlePreventInputBlur}
        >
          <div ref={optionsListRef} className={styles.optionsList}>
            {filteredOptions.length > 0 && isOpen ? (
              filteredOptions.map((option, index) => {
                const isSelected = values.includes(option.value);

                return (
                  <div
                    id={`option-${option.value}`}
                    key={option.value}
                    onClick={() => handleClickOption(option.value)}
                    className={`${styles.option} ${
                      isSelected ? styles.selectedOption : ""
                    } ${
                      index === focusedIndex && isKeyboardNavigation
                        ? isSelected
                          ? styles.focusedSelectedOption
                          : styles.focusedOption
                        : ""
                    }`}
                  >
                    <div>{option.display}</div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noOptions}>Nenhuma opção encontrada</div>
            )}
          </div>
        </div>
      )}

      <Modal
        title="Opções Selecionadas"
        size={
          selectedOptions.length <= 10
            ? ModalSizeEnum.Small
            : selectedOptions.length <= 20
            ? ModalSizeEnum.Medium
            : selectedOptions.length <= 30
            ? ModalSizeEnum.Large
            : ModalSizeEnum.VeryLarge
        }
        children={
          selectedOptions.length > 0 ? (
            <div>
              <div className={styles.modalDescription}>
                {selectedOptions.length === 1
                  ? "1 opção selecionada."
                  : `${selectedOptions.length} opções selecionadas.`}{" "}
                Clique em uma opção para removê-la da seleção.
              </div>
              <div className={styles.modalSelectedOptions}>
                {selectedOptions.map((option) => (
                  <div
                    key={option.value}
                    className={styles.modalSelectedOption}
                    onClick={() => handleRemoveOptionModal(option.value)}
                  >
                    {option.display}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>Nenhuma opção selecionada.</div>
          )
        }
        isOpen={isModalOpen}
        loading={false}
        onCancel={handleCloseModal}
        cancelText="Fechar"
        danger={false}
      />
    </div>
  );
};

export default SelectMultiple;
