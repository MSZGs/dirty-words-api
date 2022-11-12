import { createHandler, jsonResponse } from "../helpers.js";
import { Obj, Request } from "itty-router";
import { getAllWords } from "../words.js";

interface QueryParams {
  justWords: boolean;
  type?: string;
}

function parseQuery(query: Obj | undefined): QueryParams {
  return {
    justWords: query ? "justWords" in query : false,
    type: query ? query.type : undefined,
  };
}

export default createHandler((request: Request) => {
  const query = parseQuery(request.query);

  let result = getAllWords();
  if (query.type) {
    result = result.filter(x => x.type.toLocaleLowerCase() === query.type?.toLocaleLowerCase());
  }

  if (query.justWords) {
    return jsonResponse(result.map(x => x.text));
  } else {
    return jsonResponse(result);
  }
});
