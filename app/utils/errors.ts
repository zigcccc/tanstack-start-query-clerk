export class UnauthenticatedError extends Error {
  constructor(...props: Parameters<ErrorConstructor>) {
    super(...props);
    this.name = "UnauthenticatedError"
  }
}

export class ApiRequestError extends Error {
  constructor(response: Response) {
    super()
    this.message = `${response.statusText} (${response.status})`;
    this.name = "ApiRequestError"
  }
}