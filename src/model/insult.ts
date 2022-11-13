import { getManyRandomFrom, getRandomFrom, getRandomNumber } from "../helpers.js";
import { getDirtyAdjectives, getDirtyNouns } from "./words.js";

export interface Insult {
  adjectives: string[];
  concatenated: string;
  noun: string;
  sentence: string;
}

export interface CreateInsultOptions {
  adjectives: string[];
  noun: string;
}

export const createInsult = ({ noun, adjectives }: CreateInsultOptions) => {
  const concatenated = adjectives.concat(noun).join(" ");
  const sentence = `Te ${concatenated.toLowerCase()}!`;
  return <Insult>{ adjectives, concatenated, noun, sentence };
};

export interface CreateRandomInsultOptions {
  length?: number;
}

export const createRandomInsult = ({ length }: CreateRandomInsultOptions) => {
  length = length ?? getRandomNumber(1, 6);

  const noun = getRandomFrom(getDirtyNouns());
  const adjectives = getManyRandomFrom(getDirtyAdjectives(), length);

  return createInsult({ noun, adjectives });
};
