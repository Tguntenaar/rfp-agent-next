import { Category } from "@/utils/labels";
import { rpcQuery } from "@/utils/rpcQuery";

import { NextResponse } from "next/server";

export async function getAllowedCategories(accountId: string): Promise<Category[]> {

  const categories = await rpcQuery(accountId, "get_allowed_categories", {});

  return categories;
}

export async function GET() {

  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "RFP API",
      description: "API for creating and managing RFPs.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://rfp-agent-next.vercel.app/",
      },
    ],
    "x-mb": {
      "account-id": "thomasguntenaar.near",
      assistant: {
        name: "Request for Proposal (RFP) Agent",
        description: "An assistant that provides transaction templates for creating RFPs (request for proposal).",
        instructions: "Get information from the user and create a new RFP. Based on the information provided, create a new RFP. You want to know the category, title, summary, description, submission deadline and if the user consent to the terms and conditions.",
        "tools": [{ type: "generate-transaction" }]
      },
    },
    paths: {
      "/get_allowed_categories": {
        "get": {
          "tags": ["Proposals", "Categories"],
          "summary": "Get allowed categories",
          "description": "This endpoint gets the allowed categories for the Proposals.",
          "operationId": "get-allowed-categories",
          "parameters": [{
            "name": "accountId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
    }
  };
  return NextResponse.json(pluginData);
}
