import {
  createHandler,
  getRandomNumber,
  jsonResponse,
  isNumericString,
  createQueryParamParser,
  enableCross,
} from "../helpers.js";
import { createRandomInsult } from "../model/insult.js";

interface QueryParams {
  length?: number;
}

const parseQuery = createQueryParamParser<QueryParams>(query => ({
  length: isNumericString(query?.length) ? Number(query?.length) : undefined,
}));

export default createHandler(
  enableCross("*", request => {
    const query = parseQuery(request);
    const length = query.length ?? getRandomNumber(1, 6);

    return jsonResponse(createRandomInsult({ length }));
  })
);
