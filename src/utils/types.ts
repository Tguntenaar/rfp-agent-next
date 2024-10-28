export interface FunctionCallAction {
  type: "FunctionCall";
  params: {
    methodName: string;
    args: object;
    gas: string;
    deposit: string;
  };
}


export interface LabelInfoExtended {
  /**
   * @minItems 3
   * @maxItems 3
   */
  color?: [number, number, number] | null;
  title?: string | null;
  value: string;
}

export interface AddRfp {
  body: VersionedRFPBody;
  labels: string[];
}

export type VersionedRFPBody = {
  description: string;
  name: string;
  rfp_body_version: "V0";
  submission_deadline: number;
  summary: string;
  timeline: TimelineStatus;
};

export type TimelineStatus =
  | {
      status: "ACCEPTING_SUBMISSIONS";
    }
  | {
      status: "EVALUATION";
    }
  | {
      status: "PROPOSAL_SELECTED";
    }
  | {
      status: "CANCELLED";
    };

    export type AccountId = string;
    export interface SetRfpBlockHeightCallback {
      rfp: RFP;
    }
    export interface RFP {
      author_id: AccountId;
      id: number;
      snapshot: RFPSnapshot;
      snapshot_history: number[];
      social_db_post_block_height: number;
    }

    export type RFPSnapshot = {
      block_height: number;
      editor_id: AccountId;
      labels: string[];
      linked_proposals: number[];
      timestamp: number;
    } & RFPSnapshot1;
    export type RFPSnapshot1 = {
      description: string;
      name: string;
      rfp_body_version: "V0";
      submission_deadline: number;
      summary: string;
      timeline: TimelineStatus;
    };