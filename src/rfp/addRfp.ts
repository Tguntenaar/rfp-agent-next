import { Transaction, VersionedRFPBody } from "@/utils/types";

type RfpPostBody = {
  title: string;
  description: string;
  summary: string;
  submission_deadline: number;
  labels: string[];
  contract: string;
}

export async function addRfp({ body }: {body: RfpPostBody}): Promise<Transaction[] | { error: string }> {
  const { title, description, summary, submission_deadline, labels, contract } = body;

  if (!title) {
    return {
      error: "Title is required"
    }
  }

  if (!description) {
    return {
      error: "Description is required"
    }
  }

  if (!summary) {
    return {
      error: "Summary is required"
    }
  }

  if (!submission_deadline){
    return {
      error: "Submission deadline is required"
    }
  }

  if (!labels) {
    return {
      error: "Labels are required"
    }
  }

  if (!contract) {
    return {
      error: "Contract is required"
    }
  }

  const rfpBodyV2: VersionedRFPBody = {
    name: title,
    summary: summary,
    description: description,
    submission_deadline: submission_deadline,
    rfp_body_version: "V0",
    timeline: {
      "status": "ACCEPTING_SUBMISSIONS"
    },
  }

  const functionCall: Transaction = {
    receiverId: contract,
    functionCalls: [{
      methodName: "add_rfp",
      args: { body: rfpBodyV2, labels },
      gas: "30000000000000",
      amount: "0",
    }],
  };


  return [functionCall];
}