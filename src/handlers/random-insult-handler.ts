import { Obj, Request } from "itty-router";
import {
  createHandler,
  getRandomNumber,
  jsonResponse,
  getRandomFrom,
  getManyRandomFrom,
  isNumericString,
} from "../helpers.js";
import { getDirtyNouns, getDirtyAdjectives } from "../words.js";

interface Insult {
  concatenated: string;
  noun: string;
  sentence: string;
  adjectives: string[];
}

interface QueryParams {
  length?: number;
}

export const toSentence = (str: string) => `Te ${str.toLowerCase()}!`;

const parseQuery = (query: Obj | undefined) =>
  <QueryParams>{ length: isNumericString(query?.length) ? Number(query?.length) : undefined };

export const createRandomInsult = (request: Request) => {
  const query = parseQuery(request?.query);
  const length = query.length ?? getRandomNumber(1, 6);

  const noun = getRandomFrom(getDirtyNouns());
  const adjectives = getManyRandomFrom(getDirtyAdjectives(), length);

  const concatenated = adjectives.concat(noun).join(" ");

  return <Insult>{
    noun,
    adjectives,
    concatenated,
    sentence: toSentence(concatenated),
  };
};

export default createHandler(request => jsonResponse(createRandomInsult(request)));
