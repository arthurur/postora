import Link from 'next/link';
import { notFound } from 'next/navigation';
import { docTopics } from '../../../../content/agents';
import { pageMetadata } from '../../../../content/site';
import {
  McpExamples,
  McpIntroduction,
  McpSetup,
  McpTools,
} from '../../../../components/mcp-documentation';

const documents = {
  introducao: McpIntroduction,
  configuracao: McpSetup,
  ferramentas: McpTools,
  exemplos: McpExamples,
};
export const dynamicParams = false;

export function generateStaticParams() {
  return docTopics.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = docTopics.find((entry) => entry.slug === slug);
  if (!topic) notFound();
  return pageMetadata(`/docs/mcp/${slug}`, topic.title, topic.description);
}
export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = docTopics.find((entry) => entry.slug === slug);
  if (!topic) notFound();
  const Content = documents[topic.slug];
  return (
    <div className="docs-layout">
      <nav className="docs-nav" aria-label="Documentação MCP">
        {docTopics.map((entry) => (
          <Link
            aria-current={entry.slug === topic.slug ? 'page' : undefined}
            key={entry.slug}
            href={`/docs/mcp/${entry.slug}`}
          >
            {entry.title}
          </Link>
        ))}
      </nav>
      <article className="prose">
        <p className="eyebrow">Documentação · MCP</p>
        <h1>{topic.title}</h1>
        <Content />
      </article>
    </div>
  );
}
