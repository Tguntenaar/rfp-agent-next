# DevHub RFP Agent

DevHub RFP Agent is an Bitte AI Agent built to manage the [NearDevHub contract](https://github.com/NEAR-DevHub/neardevhub-contract) from a LLM chat interface. Built using Next.js 14 + Elysia.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://ref-finance-agent-next.vercel.app/)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fref-finance-agent-next)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-AI-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

## Project Walkthrough

DevHub RFP Agent facilitates the development of AI-powered contract management. [Build your own agent](https://docs.mintbase.xyz/ai/assistant-plugins)

#### API Base URL

https://rfp-agent-next.vercel.app/

#### Endpoints

- Add RFP `POST` `/api/addRfp`

- Add Proposal `POST` `/api/addProposal`

Checkout the full swagger here: https://rfp-agent-next.vercel.app/api/swagger

#### Usage
Make LLM requests to the endpoints above. Refer to the full API documentation for detailed parameter and response information.


## Getting Started
[Docs to integrate](https://docs.mintbase.xyz/ai/assistant-plugins)  

### Installation

Set `NEAR_ENV="mainnet"` in your `.env.local` file.

```bash
# install dependencies
pnpm i

# start the development server
pnpm dev:agent

# start the development server while running a dev agent
pnpm dev:agent
```

## Demo

-- 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<img src="https://i.imgur.com/fgFX6BS.png" alt="detail_image" width="0"/>


