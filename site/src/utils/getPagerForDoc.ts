import type { Doc } from "@/utils/getAllDocs";
import { sortDocs } from "@/utils/sortDocs";

export interface Pager {
  prev?: Doc;
  next?: Doc;
}

export function getPagerForDoc(doc: Doc, allDocs: Doc[]): Pager {
  const sorted = allDocs.filter((x) => x.display).sort(sortDocs);
  const index = sorted.findIndex((d) => d._id === doc._id)
  const prev = sorted[index - 1]
  const next = sorted[index + 1]
  return {
    prev,
    next,
  };
}
