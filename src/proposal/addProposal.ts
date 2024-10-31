import { Transaction } from "@/utils/types";
import { VersionedProposalBody } from "../../contract_types";

type ProposalPostBody = {
  category: string;
  title: string;
  summary: string;
  description: string;
  accepted_terms_and_conditions: boolean;
  contract: string;
  accountId: string;
  amount: number;
  currency: "NEAR" | "USDT" | "USDC" | "OTHER";
};

export async function addProposal({
  body,
}: {
  body: ProposalPostBody;
}): Promise<Transaction[]> {
  // NOTE: ADD submission_deadline
  const {
    category,
    title,
    summary,
    description,
    accepted_terms_and_conditions,
    contract,
    accountId,
    amount,
    currency,
  } = body;

  const proposalBody: VersionedProposalBody = {
    category: category,
    description: description,
    linked_proposals: [],
    name: title,
    proposal_body_version: "V2",
    receiver_account: "",
    requested_sponsor: accountId,
    requested_sponsorship_paid_in_currency: currency,
    requested_sponsorship_usd_amount: amount,
    summary: summary,
    timeline: {
      status: "DRAFT",
    },
  };

  const functionCall: Transaction = {
    receiverId: contract,
    functionCalls: [
      {
        methodName: "add_proposal",
        args: {
          body: proposalBody,
          labels: [],
          accepted_terms_and_conditions_version: accepted_terms_and_conditions,
        },
        gas: "30000000000000",
        amount: "0",
      },
    ],
  };

  return [functionCall];
}
