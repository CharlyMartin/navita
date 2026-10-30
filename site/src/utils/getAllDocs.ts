import { documentationTree } from "../../qino/trees/documentation";
import { getPathSegments, urlFromFlattenedPath } from "@/utils/urlFromFlattenedPath";

const slugAsParams = (filePath: string) => urlFromFlattenedPath(filePath).split("/").slice(1).join("/").replace(/^overview\//, '');

async function getDoc(qinoSlug: string) {
  const entry = await documentationTree.getEntry(qinoSlug);
  const flattenedPath = `documentation/${qinoSlug}`;
  const originalSlugAsParams = slugAsParams(flattenedPath);

  let slug = '/' +
    urlFromFlattenedPath(flattenedPath)
      .replace(/^documentation\//, '')
      .replace(/^overview\//, '');

  if (slug === '/getting-started') {
    slug = '/';
  }

  return {
    _id: qinoSlug,
    title: entry.title,
    description: entry.description ?? undefined,
    display: entry.display ?? true,
    markdown: entry.markdown,
    flattenedPath,
    slug,
    originalSlugAsParams,
    slugAsParams: originalSlugAsParams === 'getting-started' ? '' : originalSlugAsParams,
    pathSegments: getPathSegments(flattenedPath),
    path: urlFromFlattenedPath(flattenedPath).split("/").slice(1).join("/"),
  };
}

export type Doc = Awaited<ReturnType<typeof getDoc>>;

export async function getAllDocs() {
  const nodes = await documentationTree.getFlatTree();

  return Promise.all(nodes.map((node) => getDoc(node.slug)));
}
