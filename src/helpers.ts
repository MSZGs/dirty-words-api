import { Request, Obj } from "itty-router";

export type ResponseOptions = { body?: BodyInit | null; init?: ResponseInit };

export interface Handler {
  (request: Request, ...args: unknown[]): ResponseOptions;
}

export const createHandler = (handler: Handler) => (request: Request) => {
  const responseData = handler(request);
  return new Response(responseData.body, responseData.init);
};

export const enableCross = (origin: string, handler: Handler) => (request: Request) => {
  const headers = { "Access-Control-Allow-Origin": origin };
  const response = handler(request);
  return <ResponseOptions>{
    body: response.body,
    init: { ...response.init, headers: { ...response.init?.headers, ...headers } },
  };
};

export const jsonResponse = <TResponse>(data: TResponse, init?: ResponseInit) => {
  const body = JSON.stringify(data);
  const headers = { "Content-type": "application/json" };

  return <ResponseOptions>{ body, init: { ...init, headers: { ...init?.headers, ...headers } } };
};

export type QueryParamParser<TQueryParam> = (query: Obj | undefined) => TQueryParam;

export const createQueryParamParser =
  <TQueryParam>(parser: QueryParamParser<TQueryParam>) =>
  (request: Request) =>
    parser(request?.query);

/**
 * Getting a random integer between two values.
 * The value is no lower than min (or the next integer greater than min if min isn't an integer), and is less than (but not equal to) max.
 *
 * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values)
 *
 * @returns A random integer between the specified values.
 */
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
