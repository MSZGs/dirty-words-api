import { Router } from "itty-router";

import NotFoundHandler from "./handlers/not-found.js";
import WordsHandler from "./handlers/words-handler.js";
import RandomInsultHandler from "./handlers/random-insult-handler.js";
import DefaultHandler from "./handlers/default-handler.js";

const router = Router();

router.get("/", DefaultHandler);
router.get("/words", WordsHandler);
router.get("/insults/random", RandomInsultHandler);

router.get("*", NotFoundHandler);

export default <ExportedHandler>{
  fetch: router.handle,
};
