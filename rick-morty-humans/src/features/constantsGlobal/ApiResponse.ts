export default class ApiResponse<T> {
  message: string | null;
  errors: Array<string> | null;
  data: T;

  constructor(data: T, message: string, errors: Array<string> | null) {
    this.data = data;
    this.message = message;
    this.errors = errors;
  }
}
