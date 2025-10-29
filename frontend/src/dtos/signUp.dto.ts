export class SignUpDto {
  name: string;
  imageUrl: string;
  birthdate: string;
  email: string;
  password: string;
  confirmPassword: string;

  countryId?: string;
}
