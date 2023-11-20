import { ErrorMessages } from "../types";

export function createErrorMessage(err: any) {
  let errorMessage = ErrorMessages.defaultError;
  console.log('LOG: error => ', err);
  if (err?.response) {
    const { data } = err?.response;
    errorMessage = data?.message ? data?.message : errorMessage;
  } else if (err?.message) {
    errorMessage = err?.message;
  }

  if (errorMessage === 'timeout of 60000ms exceeded') {
    errorMessage = 'Ocorreu um erro ao conectar no serviço. Tente novamente mais tarde.';
  }

  if (
    errorMessage === "Cannot read properties of undefined (reading 'data')" ||
    errorMessage === "Cannot read properties of undefined (reading 'images')" ||
    errorMessage ===
      "Cannot destructure property 'images' of '(intermediate value)' as it is undefined."
  ) {
    errorMessage = ErrorMessages.defaultError;
  }

  return errorMessage;
}