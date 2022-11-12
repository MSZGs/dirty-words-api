import { dirtyWords } from "../data/dirty-words.json";

export type WordData = typeof dirtyWords.words[0];

export const selectText = (word: WordData) => word.text;

export const getAllWords = () => dirtyWords.words;

export const getWordsByType = (type: string) => getAllWords().filter(word => word.type === type);

export const getDirtyNouns = () => getWordsByType("noun").map(selectText);

export const getDirtyAdjectives = () => getWordsByType("adjective").map(selectText);
