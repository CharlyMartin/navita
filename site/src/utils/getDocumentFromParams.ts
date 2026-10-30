import { buildDocumentationTree } from "@/utils/buildDocumentationTree";
import { getAllDocs } from "@/utils/getAllDocs";
import { getPagerForDoc } from "@/utils/getPagerForDoc";

export async function getDocumentFromParams(params: { slug: string[] }) {
  const slug = params.slug?.join('/') || '';
  const allDocs = await getAllDocs();
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  const tree = buildDocumentationTree(allDocs).find((x) => x.id === doc._id);

  return {
    doc,
    tree,
    next: tree?.children[0],
    pager: getPagerForDoc(doc, allDocs),
  };
}
