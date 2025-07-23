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
  placeholder = "Selecione uma opção",
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

        inputRef.current?.blur();

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

    setTimeout(() => {
      closeSelect();
    }, 200);
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
          type="text"
          placeholder={selectedOption ? "" : placeholder}
          value={displayValue}
          onChange={handleChangeInput}
          onFocus={handleFocusInput}
          onKeyDown={handleKeyDown}
          className={styles.input}
          disabled={disabled}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen && focusedIndex >= 0
              ? `option-${filteredOptions[focusedIndex]?.value}`
              : undefined
          }
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

      {/* !isOpen is present temporarily. Remove later */}
      {!disabled && !isOpen && (
        <div
          className={`${styles.dropdown} ${
            isOpen ? styles.dropdownVisible : ""
          }`}
          onMouseDown={handlePreventInputBlur}
          role="listbox"
        >
          <div ref={optionsListRef} className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
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
                  role="option"
                  aria-selected={option.value === value}
                >
                  {option.display}
                </div>
              ))
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
