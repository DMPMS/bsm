import React, { useState, useRef, useEffect } from "react";
import styles from "./select.module.css";
import TriangleDownIcon from "../icons/triangleDown.icon";
import CloseIcon from "../icons/close.icon";
import { FieldStateEnum } from "../../enums/FieldState.enum";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";

interface Option {
  value: string | number;
  name: string;
  display: string | React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  validationMessage?: string;
  fieldState?: FieldStateEnum;
}

const Select = ({
  options,
  value = "",
  onChange,
  placeholder = "Selecione a opção",
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

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
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
        const selectedIndex = filteredOptions.findIndex(
          (option) => option.value === value
        );
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : -1);
      }

      inputRef.current?.focus();
    }
  };

  const handleClickIcon = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!disabled) {
      if (selectedOption && allowClear) {
        onChange("");
        closeSelect();

        return;
      }

      if (isOpen) {
        closeSelect();
      } else {
        setIsOpen(true);
        const selectedIndex = filteredOptions.findIndex(
          (option) => option.value === value
        );
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : -1);

        inputRef.current?.focus();
      }
    }
  };

  const handleFocusInput = () => {
    if (!disabled) {
      setIsKeyboardNavigation(lastInteractionWasKeyboard);

      if (!isOpen && lastInteractionWasKeyboard) {
        setIsOpen(true);
        const selectedIndex = filteredOptions.findIndex(
          (option) => option.value === value
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

  const handleClickOption = (value: string | number) => {
    onChange(value);

    closeSelect();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    setIsKeyboardNavigation(true);

    switch (e.key) {
      case KeyboardKeyEnum.ArrowDown:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          const selectedIndex = filteredOptions.findIndex(
            (option) => option.value === value
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
          const selectedIndex = filteredOptions.findIndex(
            (option) => option.value === value
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
          const selectedIndex = filteredOptions.findIndex(
            (option) => option.value === value
          );
          setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
        } else if (
          isOpen &&
          focusedIndex >= 0 &&
          filteredOptions[focusedIndex]
        ) {
          handleClickOption(filteredOptions[focusedIndex].value);
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
        if (selectedOption && allowClear && !isOpen) {
          e.preventDefault();
          onChange("");
          closeSelect();
        }

        break;
      default:
        return;
    }
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
          placeholder={selectedOption ? "" : placeholder}
          value={displayValue}
          onChange={handleChangeInput}
          onFocus={handleFocusInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        {selectedOption && allowClear ? (
          <CloseIcon onClick={handleClickIcon} size={15} disabled={disabled} />
        ) : (
          <TriangleDownIcon
            onClick={handleClickIcon}
            size={15}
            disabled={disabled}
          />
        )}
      </div>

      {!displayValue && selectedOption && (
        <div
          className={`${styles.displayNode} ${
            isOpen ? styles.displayNodeOpen : ""
          }`}
        >
          {selectedOption.display}
        </div>
      )}

      {/* Fix later the performance issue caused by too many country SVGs. */}
      {!disabled && (
        <div
          className={`${styles.dropdown} ${
            isOpen ? styles.dropdownVisible : ""
          }`}
          onMouseDown={handlePreventInputBlur}
        >
          <div
            ref={optionsListRef}
            className={styles.optionsList}
            tabIndex={-1}
          >
            {filteredOptions.length > 0 && isOpen ? (
              filteredOptions.map((option, index) => (
                <div
                  id={`option-${option.value}`}
                  key={option.value}
                  onClick={() => handleClickOption(option.value)}
                  className={`${styles.option} ${
                    option.value === value ? styles.selectedOption : ""
                  } ${
                    index === focusedIndex && isKeyboardNavigation
                      ? option.value === value
                        ? styles.focusedSelectedOption
                        : styles.focusedOption
                      : ""
                  }`}
                >
                  {option.display}
                </div>
              ))
            ) : selectedOption ? (
              <div
                id={`option-${selectedOption.value}`}
                key={selectedOption.value}
                onClick={() => handleClickOption(selectedOption.value)}
                className={`${styles.option} ${styles.selectedOption} ${
                  lastInteractionWasKeyboard ? styles.focusedSelectedOption : ""
                }`}
              >
                {selectedOption.display}
              </div>
            ) : (
              <div className={styles.noOptions}>Nenhuma opção encontrada</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
