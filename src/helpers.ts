import { RouteHandler, Request } from "itty-router";

export interface WorkerRouteHandler<TRequest> extends RouteHandler<TRequest> {
  (request: TRequest, ...args: unknown[]): Response;
}

export const createHandler = <TRequest = Request>(handler: WorkerRouteHandler<TRequest>) => handler;

export const jsonResponse = <TResponse>(data: TResponse, init?: ResponseInit) => {
  const body = JSON.stringify(data);
  const headers = { "Content-type": "application/json" };

  return new Response(body, { ...init, headers: { ...init?.headers, ...headers } });
};

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomFrom = <T>(arr: T[]) => arr[getRandomNumber(0, arr.length)];

export const getManyRandomFrom = <T>(arr: T[], count: number): T[] => {
  if (arr.length < count) {
    throw RangeError();
  }

  const result = new Set<T>();
  while (result.size < count) {
    result.add(getRandomFrom(arr));
  }
  return [...result.values()];
};

/**
 * @see [Stackoverflow](https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number)
 */
export const isNumericString = (str: unknown) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  );
};
