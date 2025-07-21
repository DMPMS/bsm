import type { CountryCodeEnum } from "../enums/CountryCode.enum";

export interface CountryType {
  id: number;
  name: string;
  code: CountryCodeEnum;
}
