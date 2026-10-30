import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { Toc } from "@/components/toc";
import { generateToc } from "@/mdx/generateToc";
import { getAllDocs } from "@/utils/getAllDocs";
import { getDocumentFromParams } from "@/utils/getDocumentFromParams";

type Props = {
  params: {
    slug: string[];
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const allDocs = await getAllDocs();

  return allDocs.filter((x) => x.display).map((doc) => ({
    slug: doc.slugAsParams.split('/')
  }));
}

export async function generateMetadata({ params }: Props) {
  const result = await getDocumentFromParams(params);

  if (!result) {
    return {};
  }

  const { doc } = result;
  const { title } = doc;

  return {
    title: `Navita - ${title}`
  };
}

export default async function DocumentPage({ params }: Props) {
  const result = await getDocumentFromParams(params);

  if (!result) {
    notFound();
  }

  const { doc, pager } = result;
  const toc = await generateToc(doc.markdown);

  return (
    <>
      <Article
        title={doc.title}
        source={doc.markdown}
        flattenedPath={doc.flattenedPath}
        description={doc.description}
        length={doc.markdown.length}
        pager={pager}
      />
      <div>
        <Toc items={toc} />
      </div>
    </>
  );
};
