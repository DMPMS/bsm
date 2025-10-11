import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./datePicker.module.css";
import { formatDateFromDate } from "../../utils/formatDateFromDate";
import { FormatDateEnum } from "../../enums/FormatDate.enum";
import { CURRENT_DATE } from "../../config/constants";
import CloseIcon from "../icons/close.icon";
import CalendarIcon from "../icons/calendar.icon";
import FastRewindIcon from "../icons/fastRewind.icon";
import PreviousIcon from "../icons/previous.icon";
import FastForwardIcon from "../icons/fastFoward.icon";
import NextIcon from "../icons/next.icon";
import { FieldStateEnum } from "../../enums/FieldState.enum";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const TOTAL_CANLENDAR_CELLS = 42;

function buildCalendarMatrix(displayMonth: Date) {
  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();

  const monthDaysTotal = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();

  const days: Date[] = [];

  const prevMonthDaysTotal = new Date(year, month, 0).getDate();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, prevMonthDaysTotal - i));
  }

  for (let i = 1; i <= monthDaysTotal; i++) {
    days.push(new Date(year, month, i));
  }

  let nextMonthDay = 1;
  while (days.length < TOTAL_CANLENDAR_CELLS) {
    days.push(new Date(year, month + 1, nextMonthDay++));
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

interface DatePickerProps {
  value?: Date;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  validationMessage?: string;
  fieldState?: FieldStateEnum;
}

const DatePicker = ({
  value = undefined,
  onChange,
  placeholder = "Selecione a data",
  disabled = false,
  allowClear = true,
  validationMessage = "",
  fieldState = FieldStateEnum.Default,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [displayMonth, setDisplayMonth] = useState<Date>(
    value ? value : CURRENT_DATE
  );
  const [focusedDate, setFocusedDate] = useState<Date | undefined>(undefined);
  const [isKeyboardNavigation, setIsKeyboardNavigation] =
    useState<boolean>(false);
  const [lastInteractionWasKeyboard, setLastInteractionWasKeyboard] =
    useState<boolean>(false);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedDate(value);

    if (value) {
      setDisplayMonth(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target as Node)
      ) {
        closeDatePicker();
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
    inputRef.current?.setCustomValidity(validationMessage);
    inputRef.current?.reportValidity();
  }, [selectedDate]);

  const weeks = useMemo(() => {
    return buildCalendarMatrix(displayMonth);
  }, [displayMonth]);

  function prevMonth() {
    setDisplayMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setDisplayMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }

  function prevYear() {
    setDisplayMonth(
      (prev) => new Date(prev.getFullYear() - 1, prev.getMonth(), 1)
    );
  }

  function nextYear() {
    setDisplayMonth(
      (prev) => new Date(prev.getFullYear() + 1, prev.getMonth(), 1)
    );
  }

  const closeDatePicker = () => {
    setIsOpen(false);
    setFocusedDate(undefined);
    setIsKeyboardNavigation(false);
    // setDisplayMonth(CURRENT_DATE); If an error occurs, try uncommenting this line.
  };

  const handleClickDatePicker = () => {
    if (!disabled) {
      setIsKeyboardNavigation(false);

      if (!isOpen) {
        setIsOpen(true);
        setFocusedDate(selectedDate ? selectedDate : undefined);
        setDisplayMonth(selectedDate ? selectedDate : CURRENT_DATE);

        inputRef.current?.focus();
      } else {
        closeDatePicker();

        inputRef.current?.blur();
      }
    }
  };

  const handleClickIcon = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!disabled) {
      if (selectedDate && allowClear) {
        onChange("");
        setSelectedDate(undefined);

        closeDatePicker();

        return;
      }

      if (isOpen) {
        closeDatePicker();
      } else {
        setIsOpen(true);
        setFocusedDate(selectedDate ? selectedDate : undefined);
        setDisplayMonth(selectedDate ? selectedDate : CURRENT_DATE);

        inputRef.current?.focus();
      }
    }
  };

  const handleFocusInput = () => {
    if (!disabled) {
      setIsKeyboardNavigation(lastInteractionWasKeyboard);

      if (!isOpen && lastInteractionWasKeyboard) {
        setIsOpen(true);
        setFocusedDate(selectedDate ? selectedDate : CURRENT_DATE);
        setDisplayMonth(selectedDate ? selectedDate : CURRENT_DATE);
      }
    }
  };

  const handlePreventInputBlur = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  function handleClickDate(date: Date) {
    onChange(formatDateFromDate(date, FormatDateEnum.YYYY_MM_DD));

    setSelectedDate(date);

    closeDatePicker();

    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;

    setIsKeyboardNavigation(true);

    let newFocusedDate = new Date(
      focusedDate ? focusedDate : selectedDate ? selectedDate : CURRENT_DATE
    );

    switch (e.key) {
      case KeyboardKeyEnum.ArrowLeft:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        }

        newFocusedDate.setDate(newFocusedDate.getDate() - 1);

        break;
      case KeyboardKeyEnum.ArrowRight:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        }

        newFocusedDate.setDate(newFocusedDate.getDate() + 1);

        break;
      case KeyboardKeyEnum.ArrowUp:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        }

        newFocusedDate.setDate(newFocusedDate.getDate() - 7);

        break;
      case KeyboardKeyEnum.ArrowDown:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        }

        newFocusedDate.setDate(newFocusedDate.getDate() + 7);

        break;
      case KeyboardKeyEnum.Enter:
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else if (isOpen && focusedDate) {
          handleClickDate(newFocusedDate);
        }

        break;
      case KeyboardKeyEnum.Escape:
        e.preventDefault();

        if (isOpen) {
          setIsOpen(false);
          newFocusedDate = new Date(selectedDate ? selectedDate : CURRENT_DATE);
        }

        break;
      case KeyboardKeyEnum.Tab:
        if (isOpen) {
          setIsOpen(false);
          newFocusedDate = new Date(CURRENT_DATE);
          setIsKeyboardNavigation(false);
        }

        break;

      case KeyboardKeyEnum.Delete:
      case KeyboardKeyEnum.Backspace:
        if (selectedDate && allowClear && !isOpen) {
          e.preventDefault();
          onChange("");

          setSelectedDate(undefined);
          newFocusedDate = new Date(CURRENT_DATE);
        }

        break;
      default:
        return;
    }
    setFocusedDate(newFocusedDate);

    if (
      newFocusedDate.getMonth() !== displayMonth.getMonth() ||
      newFocusedDate.getFullYear() !== displayMonth.getFullYear()
    ) {
      setDisplayMonth(
        new Date(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1)
      );
    }
  }

  return (
    <div ref={datePickerRef} className={styles.datePicker}>
      <div
        onClick={handleClickDatePicker}
        className={`${styles.datePickerHeader} ${
          fieldState === FieldStateEnum.Invalid
            ? styles.datePickerHeaderInvalid
            : fieldState === FieldStateEnum.Warning
            ? styles.datePickerHeaderWarning
            : ""
        } ${isOpen ? styles.datePickerHeaderOpen : ""} ${
          fieldState === FieldStateEnum.Invalid
            ? styles.datePickerHeaderInvalidOpen
            : fieldState === FieldStateEnum.Warning
            ? styles.datePickerHeaderWarningOpen
            : ""
        } ${disabled ? styles.datePickerHeaderDisabled : ""}`}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={
            selectedDate
              ? formatDateFromDate(selectedDate, FormatDateEnum.DD_MM_YYYY)
              : ""
          }
          onFocus={handleFocusInput}
          onKeyDown={handleKeyDown}
          className={styles.input}
          disabled={disabled}
        />

        {selectedDate && allowClear ? (
          <CloseIcon onClick={handleClickIcon} size={15} disabled={disabled} />
        ) : (
          <CalendarIcon
            onClick={handleClickIcon}
            size={15}
            disabled={disabled}
          />
        )}
      </div>
      {!disabled && (
        <div
          className={`${styles.dropdown} ${
            isOpen ? styles.dropdownVisible : ""
          }`}
          onMouseDown={handlePreventInputBlur}
        >
          <div className={styles.calendarHeader}>
            <div className={styles.calendarPrevButtons}>
              <FastRewindIcon
                onClick={prevYear}
                size={20}
                disabled={disabled}
              />

              <PreviousIcon onClick={prevMonth} size={20} disabled={disabled} />
            </div>

            <div className={styles.calendarTitle}>
              {displayMonth.toLocaleString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </div>

            <div className={styles.calendarNextButtons}>
              <NextIcon onClick={nextMonth} size={20} disabled={disabled} />

              <FastForwardIcon
                onClick={nextYear}
                size={20}
                disabled={disabled}
              />
            </div>
          </div>

          <div className={`${styles.calendarGrid} ${styles.calendarWeekdays}`}>
            {WEEKDAYS.map((weekday, index) => (
              <div key={index} className={`${styles.cell} ${styles.weekday}`}>
                {weekday}
              </div>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const isToday = day ? isSameDay(day, CURRENT_DATE) : false;

                  const isSelected = selectedDate
                    ? isSameDay(day, selectedDate)
                    : false;

                  const isFocused = focusedDate
                    ? isSameDay(day, focusedDate)
                    : false;

                  const isAnotherMonth =
                    day.getMonth() !== displayMonth.getMonth();

                  return (
                    <button
                      type="button"
                      key={`${weekIndex}-${dayIndex}`}
                      tabIndex={-1}
                      className={`${styles.cell} ${styles.day} ${
                        isToday ? styles.dayToday : ""
                      } ${isSelected ? styles.selectedDay : ""} ${
                        isFocused && isKeyboardNavigation
                          ? isSelected
                            ? styles.focusedSelectedDay
                            : styles.focusedDay
                          : ""
                      } ${isAnotherMonth ? styles.dayAnotherMonth : ""}`}
                      onClick={() => handleClickDate(day)}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
