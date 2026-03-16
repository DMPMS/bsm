import { validate } from "class-validator";

function formatErrors(errors: any[]): any[] {
  return errors.map((error) => ({
    property: error.property,
    constraints: error.constraints,
    children:
      error.children && error.children.length > 0
        ? formatErrors(error.children)
        : undefined,
  }));
}

export async function validateDto(dto: object): Promise<boolean> {
  const errors = await validate(dto);

  if (errors.length > 0) {
    const formattedErrors = formatErrors(errors);

    console.log("Validation errors:", JSON.stringify(formattedErrors, null, 2));

    return false;
  }
  return true;
}
