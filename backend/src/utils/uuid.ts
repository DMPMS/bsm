import { v4, validate } from "uuid";

export function generateUuid(): string {
  return v4();
}

export function isUuid(value: string): boolean {
  return validate(value);
}
