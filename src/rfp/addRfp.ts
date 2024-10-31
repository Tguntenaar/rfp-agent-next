import { Transaction, VersionedRFPBody } from "@/utils/types";
// import { parseISO } from 'date-fns';

type RfpPostBody = {
  title: string;
  description: string;
  summary: string;
  submission_deadline: number; // DATE should come in as string an be converted to unix timestamp
  labels: string[];
  contract: string;
}

export async function addRfp({ body }: {body: RfpPostBody}): Promise<Transaction[]> {
  // NOTE: ADD submission_deadline
  const { title, description, summary, submission_deadline, labels, contract } = body;


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

  // if (!title) {
  //   return []
  // }

  // if (!description) {
  //   return [];
  // }

  // if (!summary) {
  //   return []
  // }

  // if (!submission_deadline){
  //   return {
  //     status: 400,
  //     body: { error: "Invalid input" },
  //   };
  // }

  // const deadlineUnix = Date.parse(submission_deadline);
  // Math.floor(Date.parse(`${submission_deadline}`).getTime() / 1000)


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