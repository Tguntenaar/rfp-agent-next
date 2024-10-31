import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { addRfp } from "@/rfp/addRfp";
import { addProposal } from "@/proposal/addProposal";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .post("/addRfp", addRfp)
  .post("/addProposal", addProposal)
  .compile();

export const GET = app.handle;
export const POST = app.handle;
