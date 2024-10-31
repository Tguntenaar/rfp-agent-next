import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { addRfp } from "@/rfp/addRfp";
import { addProposal } from "@/proposal/addProposal";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .post("/add_rfp", addRfp)
  .post("/add_proposal", addProposal)
  .compile();

export const GET = app.handle;
export const POST = app.handle;
