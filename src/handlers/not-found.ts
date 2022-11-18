import { createHandler, jsonResponse } from "../helpers.js";

export default createHandler(() => jsonResponse("404 Not Found", { status: 404 }));
