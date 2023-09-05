import ApiError from "../core/apiError";

export function mandatoryFieldsCheck(
  body: any,
  requiredBodyKeys: Array<string>
): void | ApiError {
  console.log({ body });

  for (const key of requiredBodyKeys) {
    console.log(key, body[key]);

    if (body[key] === undefined) {
      throw {
        statusCode: 400,
        details: body,
        isOperational: false,
        message: `Missing required field: ${key}`,
      } as ApiError;
    }
  }
}
