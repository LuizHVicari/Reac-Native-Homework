export default class HttpError extends Error {
  status: number;
  additionalInfo?: Record<string, unknown>;

  constructor(message: string, status: number, additionalInfo?: Record<string, unknown>) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.additionalInfo = additionalInfo;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      additionalInfo: this.additionalInfo || null,
    };
  }
}