import { createHandler, getRandomNumber, jsonResponse, getRandomFrom, getManyRandomFrom } from "../helpers.js";
import { getDirtyNouns, getDirtyAdjectives } from "../words.js";

interface Insult {
  full: string;
  noun: string;
  adjectives: string[];
}

export const createRandomInsult = () => {
  const length = getRandomNumber(1, 6);

  const noun = getRandomFrom(getDirtyNouns());
  const adjectives = getManyRandomFrom(getDirtyAdjectives(), length);

  return <Insult>{
    noun,
    adjectives,
    full: adjectives.concat(noun).join(" "),
  };
};

export default createHandler(() => jsonResponse(createRandomInsult()));
