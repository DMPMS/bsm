import { useEffect, useState } from "react";
import type { TableHeaderType } from "../../types/TableHeaderType";
import { PAGINATION } from "../../config/constants";
import styles from "./selectTable.module.css";
import { TableHideLevelEnum } from "../../enums/TableHideLevelEnum";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";
import { FieldStateEnum } from "../../enums/FieldState.enum";

const CHECKBOX_COLUMN_COUNT = 1;

interface SelectTableProps<T> {
  data: T[];
  headers: TableHeaderType[];
  values: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  validationMessage?: string;
  fieldState?: FieldStateEnum;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectTable<T extends { id: string; [key: string]: any }>({
  data,
  headers,
  values = [],
  onChange,
  multiple = true,
  disabled = false,
  validationMessage = "",
  fieldState = FieldStateEnum.Default,
}: SelectTableProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(
    PAGINATION.DEFAULT_PAGE
  );

  useEffect(() => {
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  }, [data.length]);

  const totalPages = Math.ceil(data.length / PAGINATION.DEFAULT_LIMIT);

  const hasActionsColumn = data.some(
    (row: T) => Array.isArray(row.actions) && row.actions.length > 0
  );

  const handleSelectRow = (rowId: string) => {
    if (multiple) {
      if (values.includes(rowId)) {
        onChange(values.filter((value) => value !== rowId));
      } else {
        onChange([...values, rowId]);
      }
    } else {
      if (values.includes(rowId)) {
        onChange([]);
      } else {
        onChange([rowId]);
      }
    }
  };

  const renderTableData = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td
            className={styles.tdEmptyData}
            colSpan={headers.length + CHECKBOX_COLUMN_COUNT}
          >
            Nenhum dado encontrado
          </td>
        </tr>
      );
    }

    const start =
      (currentPage - PAGINATION.INITIAL_PAGE) * PAGINATION.DEFAULT_LIMIT;
    const end = start + PAGINATION.DEFAULT_LIMIT;

    return data.slice(start, end).map((row: T, rowIndex: number) => (
      <tr key={rowIndex}>
        <td className={styles.tdSelectInput}>
          <input
            className={`${styles.selectInput} ${
              fieldState === FieldStateEnum.Invalid ? styles.invalid : ""
            }`}
            type={multiple ? "checkbox" : "radio"}
            checked={values.includes(row.id)}
            onChange={() => handleSelectRow(row.id)}
            onKeyDown={(e) => handleKeyDown(e, row.id)}
            disabled={disabled || row.disabled}
          />
        </td>
        {headers.map((header, index) => (
          <td
            key={index}
            className={`${
              header.hideAtWith &&
              header.hideAtWith === TableHideLevelEnum.at900
                ? styles.hideAt900px
                : header.hideAtWith &&
                  header.hideAtWith === TableHideLevelEnum.at800
                ? styles.hideAt800px
                : header.hideAtWith &&
                  header.hideAtWith === TableHideLevelEnum.at700
                ? styles.hideAt700px
                : header.hideAtWith &&
                  header.hideAtWith === TableHideLevelEnum.at600
                ? styles.hideAt600px
                : header.hideAtWith &&
                  header.hideAtWith === TableHideLevelEnum.at500
                ? styles.hideAt500px
                : header.hideAtWith &&
                  header.hideAtWith === TableHideLevelEnum.at400
                ? styles.hideAt400px
                : header.hideAtWith &&
                  header.hideAtWith === TableHideLevelEnum.at300
                ? styles.hideAt300px
                : ""
            }`}
          >
            {row[header.td]}
          </td>
        ))}
      </tr>
    ));
  };

  const renderPagination = () => {
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(
      totalPages,
      startPage + PAGINATION.DEFAULT_LIMIT - 1
    );

    if (endPage - startPage + 1 < PAGINATION.DEFAULT_LIMIT) {
      startPage = Math.max(1, endPage - PAGINATION.DEFAULT_LIMIT + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((page) => (
      <a
        key={page}
        href="#"
        className={page === currentPage ? styles.active : ""}
        onClick={(e) => handlePageClick(e, page)}
      >
        {page}
      </a>
    ));
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();

    setCurrentPage(page);
  };

  const handleKeyDown = (e: React.KeyboardEvent, rowId: string) => {
    if (disabled) return;

    switch (e.key) {
      case KeyboardKeyEnum.Enter:
      case KeyboardKeyEnum.Space:
        e.preventDefault();

        handleSelectRow(rowId);

        break;
      default:
        return;
    }
  };

  return (
    <div className={styles.containerTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`${
                  header.hideAtWith &&
                  header.hideAtWith === TableHideLevelEnum.at900
                    ? styles.hideAt900px
                    : header.hideAtWith &&
                      header.hideAtWith === TableHideLevelEnum.at800
                    ? styles.hideAt800px
                    : header.hideAtWith &&
                      header.hideAtWith === TableHideLevelEnum.at700
                    ? styles.hideAt700px
                    : header.hideAtWith &&
                      header.hideAtWith === TableHideLevelEnum.at600
                    ? styles.hideAt600px
                    : header.hideAtWith &&
                      header.hideAtWith === TableHideLevelEnum.at500
                    ? styles.hideAt500px
                    : header.hideAtWith &&
                      header.hideAtWith === TableHideLevelEnum.at400
                    ? styles.hideAt400px
                    : header.hideAtWith &&
                      header.hideAtWith === TableHideLevelEnum.at300
                    ? styles.hideAt300px
                    : ""
                }`}
              >
                {header.th}
              </th>
            ))}
            {hasActionsColumn && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div className={styles.validationAndPaginationContainer}>
        {validationMessage && (
          <div className={styles.validationMessage}>{validationMessage}</div>
        )}
        <div className={styles.pagination}>{renderPagination()}</div>
      </div>
    </div>
  );
}

export default SelectTable;
