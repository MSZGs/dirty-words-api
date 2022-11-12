import { dirtyWords } from "./data/dirty-words.json";

export const getAllWords = () => dirtyWords.words;

export const getDirtyNouns = () => dirtyWords.words.filter(x => x.type === "f").map(x => x.text);

export const getDirtyAdjectives = () => dirtyWords.words.filter(x => x.text === "m").map(x => x.text);
