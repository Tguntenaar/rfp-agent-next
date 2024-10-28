import { rpcQuery } from "@/utils/rpcQuery";
import { LabelInfoExtended } from "@/utils/types";
import Fuse, { IFuseOptions } from "fuse.js";
import { NextResponse } from "next/server";

interface AllowedAccount {
  accountId: string;
  synonyms: string[];
}

export async function getGlobalLabels({body}: {body: {accountId: string}}): Promise<LabelInfoExtended[]> {
  const { accountId } = body;
  console.log("accountId",accountId);

  const allowedAccounts = [
    {accountId:'infrastructure-committee.near', synonyms: ['infra', 'infra-committee', 'infrastructure']}, 
    {accountId:'forum.potlock.near', synonyms: ['forum.potlock.near', 'potlock', 'pot lock', 'potluck', 'pot', 'lock', 'ai-pgf', 'ai-pgf-forum', 'forum pgf', 'pgf', 'Public goods funding', 'ai pgf', 'ai pgf']}
  ];

  // Set up the fuse.js options
  const options: IFuseOptions<AllowedAccount> = {
    includeScore: true,
    keys: [
      { name: "accountId", weight: 0.7 },
      { name: "synonyms", weight: 0.3 },
    ],
    isCaseSensitive: false,
    threshold: 0.3, // Adjust the threshold for the desired level of fuzziness
  };

  // Create a new fuse instance
  const fuse = new Fuse(allowedAccounts, options);

  // Perform the search
  const results = fuse.search(accountId.toLowerCase());

  // Select the best match (lowest score)
  const bestMatch = results.length > 0 ? results.reduce((best, current) => 
    current.score && current.score < (best?.score || Infinity) ? current : best).item : {accountId:'infrastructure-committee.near'};

  if (!bestMatch) {
    throw new Error(`No matching account found for accountId: ${accountId}`);
  }

  const labels = await rpcQuery(bestMatch.accountId, "get_global_labels", {});

  return labels;
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
        name: "RFP Agent",
        description: "An assistant that provides transaction templates for creating request for proposals.",
        instructions: "Engage the user to gather information for a new Request for Proposal (RFP). Collect and confirm the following details: RFP category, title, summary, full description, submission deadline, and user consent to terms and conditions. Use this information to generate a transaction template to create the RFP. By calling the /add_rfp endpoint",
        guidance: "Determine the appropriate contract accountId for the RFP: either 'infrastructure-committee.near' or 'forum.potlock.near', based on context.",
        "tools": [{ type: "generate-transaction" }]
      },
    },
    paths: {
      "/get_global_labels": {
        "post": {
          "tags": ["RFP", "Labels", "Categories"],
          "summary": "Get the RFP labels or categories of a given accountId",
          "description": "This endpoint gets the RFP labels or categories that are available for a given accountId.",
          "operationId": "get-rfp-labels",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "accountId": {
                      "type": "string",
                      "description": "The accountId of the RFP contract",
                      "enum": ["infrastructure-committee.near", "forum.potlock.near"]
                    }
                  },
                  "required": ["accountId"]
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
                    "type": "array",
                    "items": {
                      "type": "object",
                    }
                  }
                }
              }
            }
          }
        }
      }
  },
  };
  return NextResponse.json(pluginData);
}
