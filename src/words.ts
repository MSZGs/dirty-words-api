import { dirtyWords } from "./data/dirty-words.json";

export const getAllWords = () => dirtyWords.words;

export const getDirtyNouns = () => dirtyWords.words.filter(x => x.type === "noun").map(x => x.text);

export const getDirtyAdjectives = () => dirtyWords.words.filter(x => x.type === "adjective").map(x => x.text);
