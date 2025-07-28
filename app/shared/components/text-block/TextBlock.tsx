'use client';

import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TextBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ content, ...props }) => {
  const editor = useEditor({
    content,
    editable: false,
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: 'text-blue-600 underline hover:text-blue-800'
        }
      })
    ]
  });

  if (!editor) return null;

  return (
    <div {...props}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextBlock;
