import { FormatDateEnum } from "../enums/FormatDate.enum";

export function formatDateFromDate(
  date: Date,
  outputFormat: FormatDateEnum,
): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (outputFormat) {
    case FormatDateEnum.DASH_YYYY_MM_DD:
      return `${year}-${month}-${day}`;
    case FormatDateEnum.SLASH_MM_DD_YYYY:
      return `${month}/${day}/${year}`;
    case FormatDateEnum.SLASH_DD_MM_YYYY:
      return `${day}/${month}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

export function formatDateFromString(
  dateString: string,
  inputFormat: FormatDateEnum,
  outputFormat: FormatDateEnum,
): string {
  const date = parseDate(dateString, inputFormat);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (outputFormat) {
    case FormatDateEnum.DASH_YYYY_MM_DD:
      return `${year}-${month}-${day}`;
    case FormatDateEnum.SLASH_MM_DD_YYYY:
      return `${month}/${day}/${year}`;
    case FormatDateEnum.SLASH_DD_MM_YYYY:
      return `${day}/${month}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

export function parseDate(
  dateString: string,
  inputFormat: FormatDateEnum,
): Date {
  let year: number, month: number, day: number;

  switch (inputFormat) {
    case FormatDateEnum.DASH_YYYY_MM_DD: {
      const parts = dateString.split("-");

      year = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1;
      day = parseInt(parts[2]);

      break;
    }

    case FormatDateEnum.SLASH_MM_DD_YYYY: {
      const parts = dateString.split("/");

      month = parseInt(parts[0]) - 1;
      day = parseInt(parts[1]);
      year = parseInt(parts[2]);
      break;
    }

    case FormatDateEnum.SLASH_DD_MM_YYYY: {
      const parts = dateString.split("/");

      day = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1;
      year = parseInt(parts[2]);
      break;
    }

    default: {
      const parts = dateString.split("-");

      year = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1;
      day = parseInt(parts[2]);

      break;
    }
  }

  return new Date(year, month, day);
}
