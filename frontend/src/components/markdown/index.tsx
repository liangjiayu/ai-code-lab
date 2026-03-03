import { RiCheckLine, RiFileCopyLine } from '@remixicon/react';
import { type ComponentProps, useRef, useState } from 'react';
import 'highlight.js/styles/github.css';
import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { copyToClipboard } from '@/lib/utils';

import './index.css';

interface AstNode {
  type: string;
  children?: AstNode[];
  properties?: { className?: string[] };
}

function CodeBlockHeader({
  language,
  onCopy,
}: {
  language: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between border-white border-b px-4 py-3 text-gray-500 text-xs">
      <span>{language}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="flex cursor-pointer items-center gap-1 hover:text-gray-700"
      >
        {copied ? (
          <>
            <RiCheckLine size={14} className="text-green-500" />
            <span>已复制</span>
          </>
        ) : (
          <>
            <RiFileCopyLine size={14} />
            <span>复制代码</span>
          </>
        )}
      </button>
    </div>
  );
}

function PreBlock({
  children,
  node,
  ...props
}: ComponentProps<'pre'> & { node?: AstNode }) {
  const preRef = useRef<HTMLPreElement>(null);

  const codeNode = node?.children?.find((c) => c.type === 'element');
  const classList = codeNode?.properties?.className ?? [];
  const langClass = classList.find((c) => c.startsWith('language-'));
  const language = langClass ? langClass.replace('language-', '') : '';

  const handleCopy = () => {
    const code = preRef.current?.querySelector('code')?.textContent ?? '';
    copyToClipboard(code.replace(/\n$/, ''));
  };

  return (
    <pre ref={preRef} {...props}>
      <CodeBlockHeader language={language} onCopy={handleCopy} />
      {children}
    </pre>
  );
}

const markdownComponents: Components = {
  pre: PreBlock,
};

interface MarkdownRenderProps {
  content: string;
}

export function MarkdownRender({ content }: MarkdownRenderProps) {
  return (
    <div className="ai-markdown">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </Markdown>
    </div>
  );
}
