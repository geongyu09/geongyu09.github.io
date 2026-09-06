import { Fragment } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  A,
  Blockquote,
  Code,
  EM,
  HR,
  Img,
  LI,
  OL,
  P,
  Pre,
  TD,
  TH,
  Table,
  UL,
} from './components';
import rehypeUnwrapImages from './plugins/rehypeUnwrapImages';
import './style.css';

const prettyCodeOptions: Options = {
  theme: {
    light: 'min-light',
    dark: 'min-dark',
  },
  keepBackground: false,
  defaultLang: 'plaintext',
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeUnwrapImages)
  .use(rehypePrettyCode, prettyCodeOptions)
  .use(rehypeReact, {
    Fragment,
    jsx: (jsxRuntime as any).jsx,
    jsxs: (jsxRuntime as any).jsxs,
    components: {
      code: Code as any,
      h1: H1 as any,
      h2: H2 as any,
      h3: H3 as any,
      h4: H4 as any,
      h5: H5 as any,
      h6: H6 as any,
      p: P as any,
      ul: UL as any,
      ol: OL as any,
      li: LI as any,
      a: A as any,
      img: Img as any,
      table: Table as any,
      th: TH as any,
      td: TD as any,
      pre: Pre as any,
      hr: HR as any,
      em: EM as any,
      blockquote: Blockquote as any,
    },
  } as any);

interface MarkdownProps {
  markdown: string;
}

export default async function MarkdownViewer({ markdown }: MarkdownProps) {
  const file = await processor.process(markdown);
  return <div className="typhography">{file.result as React.ReactNode}</div>;
}
