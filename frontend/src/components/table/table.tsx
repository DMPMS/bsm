import { useEffect, useState } from "react";
import { TableActionEnum } from "../../enums/TableAction.enum";
import type { TableHeaderType } from "../../types/TableHeaderType";
import { PAGINATION } from "../../config/constants";
import styles from "./table.module.css";
import { TableHideLevelEnum } from "../../enums/TableHideLevel.enum";
import PencilIcon from "../icons/pencil.icon";
import TrashIcon from "../icons/trash.icon";
import { KeyboardKeyEnum } from "../../enums/KeyboardKey.enum";
import SoccerFieldIcon from "../icons/soccerField.icon";

interface TableProps<T> {
  data: T[];
  headers: TableHeaderType[];
  handleUpdate?: (id: string) => void;
  handleOpenModalDelete?: (id: string) => void;
  handleLineupglobals?: (teamglobalId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<T extends { id: string; [key: string]: any }>({
  data,
  headers,
  handleUpdate,
  handleOpenModalDelete,
  handleLineupglobals,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(
    PAGINATION.DEFAULT_PAGE,
  );
  const [currentWindowWidth, setCurrentWindowWidth] = useState<number>(
    window.innerWidth,
  );

  useEffect(() => {
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  }, [data.length]);

  useEffect(() => {
    checkColumnVisibility();

    window.addEventListener("resize", checkColumnVisibility);

    return () => {
      window.removeEventListener("resize", checkColumnVisibility);
    };
  }, []);

  const checkColumnVisibility = () => {
    const currentWidth = window.innerWidth;

    setCurrentWindowWidth(currentWidth);
  };

  const totalPages = Math.ceil(data.length / PAGINATION.DEFAULT_LIMIT);

  const hasActionsColumn = data.some(
    (row: T) => Array.isArray(row.actions) && row.actions.length > 0,
  );

  const renderTableData = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td className={styles.tdEmptyData} colSpan={headers.length}>
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
        {headers.map(
          (header, index) =>
            (!header.hideAtWidth ||
              currentWindowWidth > header.hideAtWidth) && (
              <td
                key={index}
                className={`${
                  header.hideAtWidth &&
                  header.hideAtWidth === TableHideLevelEnum.at900
                    ? styles.hideAt900px
                    : header.hideAtWidth &&
                        header.hideAtWidth === TableHideLevelEnum.at800
                      ? styles.hideAt800px
                      : header.hideAtWidth &&
                          header.hideAtWidth === TableHideLevelEnum.at700
                        ? styles.hideAt700px
                        : header.hideAtWidth &&
                            header.hideAtWidth === TableHideLevelEnum.at600
                          ? styles.hideAt600px
                          : header.hideAtWidth &&
                              header.hideAtWidth === TableHideLevelEnum.at500
                            ? styles.hideAt500px
                            : header.hideAtWidth &&
                                header.hideAtWidth === TableHideLevelEnum.at400
                              ? styles.hideAt400px
                              : header.hideAtWidth &&
                                  header.hideAtWidth ===
                                    TableHideLevelEnum.at300
                                ? styles.hideAt300px
                                : ""
                }`}
              >
                {row[header.td]}
              </td>
            ),
        )}
        {hasActionsColumn && row.actions.length > 0 && (
          <td>
            <div className={styles.contentTdActions}>
              {row.actions.includes(TableActionEnum.Lineupglobals) && (
                <button
                  type="button"
                  className={`${styles.buttonIcon} ${styles.buttonIconLineupglobals}`}
                  onClick={() =>
                    handleLineupglobals
                      ? handleLineupglobals(row.id)
                      : undefined
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === KeyboardKeyEnum.Enter ||
                      e.key === KeyboardKeyEnum.Space
                    ) {
                      e.preventDefault();
                      if (handleLineupglobals) {
                        handleLineupglobals(row.id);
                      }
                    }
                  }}
                >
                  <SoccerFieldIcon
                    size={20}
                    circle={true}
                    color="var(--color-blue-1)"
                    colorHover="var(--color-blue-2)"
                    colorDisabled="var(--color-blue-1)"
                  />
                </button>
              )}
              {row.actions.includes(TableActionEnum.Update) && (
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
                    circle={true}
                    color="var(--color-yellow-1)"
                    colorHover="var(--color-yellow-2)"
                    colorDisabled="var(--color-yellow-1)"
                  />
                </button>
              )}
              {row.actions.includes(TableActionEnum.Delete) && (
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
                    circle={true}
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
      startPage + PAGINATION.DEFAULT_LIMIT - 1,
    );

    if (endPage - startPage + 1 < PAGINATION.DEFAULT_LIMIT) {
      startPage = Math.max(1, endPage - PAGINATION.DEFAULT_LIMIT + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
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
        <thead className={styles.thead}>
          <tr>
            {headers.map(
              (header, index) =>
                (!header.hideAtWidth ||
                  currentWindowWidth > header.hideAtWidth) && (
                  <th
                    key={index}
                    className={`${
                      header.hideAtWidth &&
                      header.hideAtWidth === TableHideLevelEnum.at900
                        ? styles.hideAt900px
                        : header.hideAtWidth &&
                            header.hideAtWidth === TableHideLevelEnum.at800
                          ? styles.hideAt800px
                          : header.hideAtWidth &&
                              header.hideAtWidth === TableHideLevelEnum.at700
                            ? styles.hideAt700px
                            : header.hideAtWidth &&
                                header.hideAtWidth === TableHideLevelEnum.at600
                              ? styles.hideAt600px
                              : header.hideAtWidth &&
                                  header.hideAtWidth ===
                                    TableHideLevelEnum.at500
                                ? styles.hideAt500px
                                : header.hideAtWidth &&
                                    header.hideAtWidth ===
                                      TableHideLevelEnum.at400
                                  ? styles.hideAt400px
                                  : header.hideAtWidth &&
                                      header.hideAtWidth ===
                                        TableHideLevelEnum.at300
                                    ? styles.hideAt300px
                                    : ""
                    }`}
                  >
                    {header.th}
                  </th>
                ),
            )}
            {hasActionsColumn && <th>Ações</th>}
          </tr>
        </thead>
        <tbody className={styles.tbody}>{renderTableData()}</tbody>
      </table>
      <div className={styles.pagination}>{renderPagination()}</div>
    </div>
  );
}

export default Table;
