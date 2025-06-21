import { FormatDateEnum } from "../enums/FormatDate.enum";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { HttpError } from "./httpError";

export function formatDate(date: Date, format: FormatDateEnum): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case FormatDateEnum.YYYY_MM_DD:
      return `${year}-${month}-${day}`;
    default:
      throw new HttpError(
        HttpStatusEnum.BadRequest,
        `Unsupported date format: ${format}`
      );
  }
}
