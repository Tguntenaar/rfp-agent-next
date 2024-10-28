import { FunctionCallAction } from "@/utils/types";
import { NextResponse } from "next/server";

/**
 * This is the how the contract works. However it is not useful for our agent to ask for a body
 */
export async function addRfpV1({ body }: any) {
  const { body: rfpBody, labels } = body as { body: any; labels: string[] };

  if (!rfpBody || !labels) {
    return {
      status: 400,
      body: { error: "Invalid input" },
    };
  }

  const functionCall: FunctionCallAction = {
    type: "FunctionCall",
    params: {
      methodName: "add_rfp",
      args: { body: rfpBody, labels },
      gas: "30000000000000",
      deposit: "0",
    },
  };

  return functionCall;
}

export async function GetV1PluginData() {

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
      "/add_rfp": {
     "post": {
        "tags": ["RFP"],
        "summary": "Add a new RFP",
        "description": "This endpoint adds a new RFP to the community.",
        "operationId": "add-rfp",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "body": {
                    "type": "object" // NOTE: The problem here is that the body is an object of unknown structure to the agent
                  },
                  "labels": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "required": ["body", "labels"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string"
                    },
                    "params": {
                      "type": "object",
                      "properties": {
                        "methodName": {
                          "type": "string"
                        },
                        "args": {
                          "type": "object"
                        },
                        "gas": {
                          "type": "string"
                        },
                        "deposit": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  },
  };
  return NextResponse.json(pluginData);
}
