import { Request } from "itty-router";
import { createHandler, jsonResponse, createQueryParamParser } from "../helpers.js";
import { getAllWords, getWordsByType, selectText, WordData } from "../model/words.js";

interface QueryParams {
  justWords: boolean;
  type?: string;
}

const parseQuery = createQueryParamParser<QueryParams>(query => ({
  justWords: query ? "justWords" in query : false,
  type: query ? query.type : undefined,
}));

export default createHandler((request: Request) => {
  const query = parseQuery(request);

  let result: WordData[] = [];
  if (query.type) {
    result = getWordsByType(query.type.toLocaleLowerCase());
  } else {
    result = getAllWords();
  }

  if (query.justWords) {
    return jsonResponse(result.map(selectText));
  } else {
    return jsonResponse(result);
  }
});
