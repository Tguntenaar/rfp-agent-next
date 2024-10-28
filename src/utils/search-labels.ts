import Fuse, { IFuseOptions } from "fuse.js";
import { aiPGFLabels, infrastructureLabels, type Label, type Category } from "@/utils/labels";

// Create an array of tokens
const labels: Label[][] =  Object.values(infrastructureLabels).concat(Object.values(aiPGFLabels)).map(label => [label]);

// Set up the fuse.js options
const options: IFuseOptions<Label[]> = {
  includeScore: true,
  keys: [],
  isCaseSensitive: false,
  threshold: 0.3, // Adjust the threshold for the desired level of fuzziness
};

// Create a new fuse instance

const fuse = new Fuse(labels, options);



// TODO: there could be multiple labels so query: string[]
export const searchLabels = (query: string): Category => {
  // Search the tokens with the query
  const result = fuse.search(query);

  // Map the result to only return the tokens
  return result.length > 0 ? result[0].item[0] : "Other";
};
