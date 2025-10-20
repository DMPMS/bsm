import { useState } from "react";
import { TableActionEnum } from "../../enums/TableActionEnum";
import type { TableHeaderType } from "../../types/TableHeaderType";
import { PAGINATION } from "../../config/constants";
import styles from "./table.module.css";
import { TableHideLevelEnum } from "../../enums/TableHideLevelEnum";
import PencilIcon from "../icons/pencil.icon";
import TrashIcon from "../icons/trash.icon";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";

interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  headers: TableHeaderType[];
  actions?: TableActionEnum[];
  handleUpdate?: (id: string) => void;
  handleOpenModalDelete?: (id: string) => void;
}

const Table = ({
  data,
  headers,
  actions,
  handleUpdate,
  handleOpenModalDelete,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(
    PAGINATION.DEFAULT_PAGE
  );

  const totalPages = Math.ceil(data.length / PAGINATION.DEFAULT_LIMIT);

  const renderTableData = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td
            className={styles.tdEmptyData}
            colSpan={headers.length + (actions && actions.length > 0 ? 1 : 0)}
          >
            Nenhum dado encontrado.
          </td>
        </tr>
      );
    }

    const start =
      (currentPage - PAGINATION.INITIAL_PAGE) * PAGINATION.DEFAULT_LIMIT;
    const end = start + PAGINATION.DEFAULT_LIMIT;

    return data.slice(start, end).map((row: typeof data, rowIndex: number) => (
      <tr key={rowIndex}>
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
        {actions && actions.length > 0 && (
          <td>
            <div className={styles.contentTdActions}>
              {actions.includes(TableActionEnum.Update) && (
                <button
                  type="button"
                  className={`${styles.buttonIcon} ${styles.buttonIconUpdate}`}
                  onClick={() =>
                    handleUpdate ? handleUpdate(row.id) : undefined
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === KeyboardKeyEnum.Enter ||
                      e.key === KeyboardKeyEnum.Space
                    ) {
                      e.preventDefault();
                      if (handleUpdate) {
                        handleUpdate(row.id);
                      }
                    }
                  }}
                >
                  <PencilIcon
                    size={20}
                    color="var(--color-yellow-1)"
                    colorHover="var(--color-yellow-2)"
                    colorDisabled="var(--color-yellow-1)"
                  />
                </button>
              )}
              {actions.includes(TableActionEnum.Delete) && (
                <button
                  type="button"
                  className={`${styles.buttonIcon} ${styles.buttonIconDelete}`}
                  onClick={() =>
                    handleOpenModalDelete
                      ? handleOpenModalDelete(row.id)
                      : undefined
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === KeyboardKeyEnum.Enter ||
                      e.key === KeyboardKeyEnum.Space
                    ) {
                      e.preventDefault();
                      if (handleOpenModalDelete) {
                        handleOpenModalDelete(row.id);
                      }
                    }
                  }}
                >
                  <TrashIcon
                    size={20}
                    color="var(--color-red-1)"
                    colorHover="var(--color-red-2)"
                    colorDisabled="var(--color-red-1)"
                  />
                </button>
              )}
            </div>
          </td>
        )}
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

  return (
    <div className={styles.containerTable}>
      <table className={styles.table}>
        <thead>
          <tr>
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
            {actions && actions.length > 0 && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div className={styles.pagination}>{renderPagination()}</div>
    </div>
  );
};

export default Table;
