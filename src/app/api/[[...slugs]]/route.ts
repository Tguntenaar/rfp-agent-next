import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { addRfp } from "@/rfp/addRfp";
// import { getGlobalLabels } from "@/rfp/getGlobalLabels";
// import { getAllowedCategories } from "@/rfp/getAllowedCategories";
const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .post("/add_rfp", addRfp)
  // .post("/get_global_labels", getGlobalLabels)
  // .post("/get_allowed_categories", getAllowedCategories)
  .compile();

export const GET = app.handle;
export const POST = app.handle;
