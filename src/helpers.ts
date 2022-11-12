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
