import type { CountryCodeEnum } from "../enums/CountryCode.enum";

export interface CountryType {
  id: string;
  name: string;
  code: CountryCodeEnum;
}
