
interface BitteConfig {
  url: string; // tunnelUrl
  pluginId: string;
  receivedId: string;
}

const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config: BitteConfig = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
  console.warn("Missing account info.");
}

if (!config || !config.url) {
  console.warn("Missing config or url in config.");
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
        url: config.url || "https://rfp-agent-next.vercel.app/",
      },
    ],
    "x-mb": {
      "account-id": "thomasguntenaar.near",
      assistant: {
        name: "RFP Agent",
        description:
          "An assistant that provides transaction templates for creating request for proposals.",
        instructions:
          "Engage the user to gather information for a new Request for Proposal (RFP). Collect and confirm the following details: RFP category, title, summary, full description, submission deadline. Use this information to generate a transaction template to create the RFP. By calling the /add_rfp endpoint",
        guidance:
          "Determine the appropriate contract accountId for the RFP: either 'infrastructure-committee.near' or 'forum.potlock.near', based on context.",
        tools: [{ type: "generate-transaction" }],
      },
    },
    paths: {
      "/add_rfp": {
        post: {
          tags: ["RFP"],
          summary: "Add a new RFP or request for proposal to the contract",
          description:
            "An array of transactions objects necessary to execute the creation of a new RFP.",
          operationId: "add-rfp",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: "The title or name of the RFP",
                      maxLength: 80,
                      minLength: 1,
                    },
                    summary: {
                      type: "string",
                      description: "A short summary of the RFP",
                      maxLength: 500,
                      minLength: 1,
                    },
                    description: {
                      type: "string",
                      description:
                        "The main description of the RFP written in markdown rich text format",
                      minLength: 1,
                    },
                    submission_deadline: {
                      type: "string",
                      description:
                        "The submission deadline of the RFP as formatted date string (YYYY-MM-DD)",
                    },
                    labels: {
                      type: "array",
                      items: {
                        type: "string",
                        enum: [
                          "Bridges",
                          "Data Lakes",
                          "Explorers",
                          "Indexers",
                          "Onramps / Offramps",
                          "Oracles",
                          "Query API",
                          "RPC Nodes",
                          "Other",
                        ],
                      },
                    },
                    contract: {
                      type: "string",
                      description: "The account ID of the contract that will receive the transaction, default value is 'infrastructure-committee.near'",
                      enum: ["infrastructure-committee.near", "forum.potlock.near"],
                    }
                  },
                  required: [
                    "title",
                    "summary",
                    "description",
                    "submission_deadline",
                    "labels",
                    "contract",
                  ],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "add_rfp transactions generated successfully.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    "items": {
                    "type": "object",
                    "properties": {
                      "receiverId": {
                        "type": "string",
                        "description": "The account ID of the contract that will receive the transaction."
                      },
                      "functionCalls": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "methodName": {
                              "type": "string",
                              "description": "The name of the method to be called on the contract."
                            },
                            "args": {
                              "type": "object",
                              "description": "Arguments for the function call.",
                              "properties": {
                                "body": {
                                  "type": "object",
                                },
                                "labels": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                  },
                                },
                              },
                              "additionalProperties": true
                            },
                            "gas": {
                              "type": "string",
                              "description": "The amount of gas to attach to the transaction, in yoctoNEAR."
                            },
                            "amount": {
                              "type": "string",
                              "description": "The amount of NEAR tokens to attach to the transaction, in yoctoNEAR."
                            }
                          },
                          "required": ["methodName", "args", "gas", "amount"]
                        }
                      }
                    },
                    "required": ["receiverId", "functionCalls"]
                  }
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  // Pretty-print the JSON
  const formattedData = JSON.stringify(pluginData, null, 2);
  return new Response(formattedData, {
    headers: { 'Content-Type': 'application/json' },
  });
}
