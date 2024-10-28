import { LabelInfoExtended } from "./types";

// Category is for proposals only
export type Category = String;
// Label is for RFPs
export type Label = String;

export const aiPGFLabelsInfo: LabelInfoExtended[] = 
[{"value":"A small build","title":"A small build","color":[4,164,110]},
{"value":"Bounty","title":"Bounty","color":[124,102,220]},
{"value":"MVP","title":"MVP","color":[220,102,102]},
{"value":"Quick Start","title":"Quick Start","color":[220,194,102]}];

export const aiPGFLabels : Label[] = ["A small build", "Bounty", "MVP", "Quick Start"];

export const infrastructureLabels: Label[] = [
  "Bridges",
  "Data Lakes",
  "Explorers",
  "Indexers",
  "Onramps / Offramps",
  "Oracles",
  "Query API",
  "RPC Nodes",
  "Other",
];
