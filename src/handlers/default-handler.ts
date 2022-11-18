import { createHandler, jsonResponse } from "../helpers.js";
import { createRandomInsult } from "../model/insult.js";

const msg = () => `Én csak egy teáskanna vagyok! ${createRandomInsult({ length: 3 }).sentence}`; // cspell:disable-line

export default createHandler(() => jsonResponse({ message: msg() }, { status: 418 }));
