import { Router } from "itty-router";

import NotFoundHandler from "./handlers/not-found.js";
import WordsHandler from "./handlers/words-handler.js";

const router = Router();

router.get("/words", WordsHandler);

router.get("*", NotFoundHandler);

export default {
  fetch: router.handle,
};
