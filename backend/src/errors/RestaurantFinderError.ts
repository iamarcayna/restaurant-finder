interface ErrorData {
  message: string;
  error?: object;
  status: number;
}

export class RestaurantFinderError extends Error {
  name = "RestaurantFinderError";
  status: number;
  error?: object;

  constructor(data: ErrorData) {
    super(data.message);
    this.status = data.status;
    this.error = data.error;
  }
}
