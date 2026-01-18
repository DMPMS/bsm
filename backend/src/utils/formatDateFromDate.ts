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
