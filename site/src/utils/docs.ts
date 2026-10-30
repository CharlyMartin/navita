import { documentationTree } from "../../qino/trees/documentation";
import { urlFromFlattenedPath } from "@/utils/urlFromFlattenedPath";

// "100-overview/100-getting-started" → "/", "300-api/101-globalStyle" → "/api/global-style"
function getDocUrl(slug: string) {
  const path = urlFromFlattenedPath(slug).replace(/^overview\//, '');

  return path == 'getting-started' ? '/' : `/${path}`;
}

// Section anchors have children and aren't pages
export async function getDocPages() {
  const nodes = await documentationTree.getFlatTree();

  return nodes
    .filter((node) => node.children.length == 0)
    .map((node) => ({
      slug: node.slug,
      title: node.title,
      url: getDocUrl(node.slug),
    }));
}

export async function getNavigation() {
  const sections = await documentationTree.getTree();

  return sections.map((section) => ({
    title: section.title,
    children: section.children.map((node) => ({
      title: node.title,
      url: getDocUrl(node.slug),
    })),
  }));
}

export type Navigation = Awaited<ReturnType<typeof getNavigation>>;

export async function getDoc(url: string) {
  const pages = await getDocPages();
  const index = pages.findIndex((page) => page.url == url);

  if (index == -1) {
    return null;
  }

  const { slug } = pages[index];
  const entry = await documentationTree.getEntry(slug);

  return {
    title: entry.title,
    description: entry.description ?? undefined,
    markdown: entry.markdown,
    flattenedPath: `documentation/${slug}`,
    pager: {
      prev: pages[index - 1],
      next: pages[index + 1],
    },
  };
}

export type Pager = NonNullable<Awaited<ReturnType<typeof getDoc>>>['pager'];
