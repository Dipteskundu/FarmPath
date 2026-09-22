export interface ErrorDetails {
  code?: string;
  message?: string;
}

function isErrorDetails(value: unknown): value is ErrorDetails {
  return typeof value === "object" && value !== null;
}

export function getErrorDetails(error: unknown): ErrorDetails {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (!isErrorDetails(error)) {
    return {};
  }

  return {
    code: typeof error.code === "string" ? error.code : undefined,
    message: typeof error.message === "string" ? error.message : undefined,
  };
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return getErrorDetails(error).message || fallback;
}

export function getResponseErrorMessage(response: unknown, fallback: string): string {
  if (typeof response !== "object" || response === null) {
    return fallback;
  }

  const value = response as { message?: unknown; errors?: unknown };
  if (typeof value.message === "string") {
    return value.message;
  }

  if (Array.isArray(value.errors) && typeof value.errors[0] === "object" && value.errors[0] !== null) {
    const firstError = value.errors[0] as { message?: unknown };
    if (typeof firstError.message === "string") {
      return firstError.message;
    }
  }

  return fallback;
}
