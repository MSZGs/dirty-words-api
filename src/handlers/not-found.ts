import { createHandler } from "../helpers.js";

export default createHandler(() => new Response("Not found", { status: 404 }));
