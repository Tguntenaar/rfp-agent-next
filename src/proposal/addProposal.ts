import { Transaction, VersionedRFPBody } from "@/utils/types";

type ProposalPostBody = {
  name: string;
  description: string;
  summary: string;
  labels: string[];
}

export async function addProposal({ body }: {body: ProposalPostBody}): Promise<Transaction[]> {
  // NOTE: ADD submission_deadline
  const { name, description, summary, labels } = body;


  // TODO interact with RPC of the given contract get_allowed_categories;
  // const foundCategory = searchCategory(labels);

  // NOTE: We want to get the input this as strict as possible. 
  // If an LLM is not able to provide the correct format, it should be rejected or we should try to fix it.

  // if (!foundCategory) {
  //   return {
  //     status: 400,
  //     body: { error: "Invalid input" },
  //   };
  // }

  // TODO check if the name is under 80 characters
  if (!name) {
    return []
  }

  if (!description) {
    return [];
  }

  // TODO: check if summary is under 500 characters
  if (!summary) {
    return []
  }

  // TODO could be two weeks from now or month from now.
  // if (!submission_deadline){
  //   return {
  //     status: 400,
  //     body: { error: "Invalid input" },
  //   };
  // }


  const rfpBodyV2: VersionedRFPBody = {
    name: name,
    summary: summary,
    description: description,
    // submission_deadline: submission_deadline,
    submission_deadline: 1730058609,
    rfp_body_version: "V0",
    timeline: {
      "status": "ACCEPTING_SUBMISSIONS"
    },
  }

  const functionCall: Transaction = {
    receiverId: "infrastructure-committee.near",
    functionCalls: [{
      methodName: "add_rfp",
      args: { body: rfpBodyV2, labels },
      gas: "30000000000000",
      amount: "0",
    }],
  };


  return [functionCall];
}