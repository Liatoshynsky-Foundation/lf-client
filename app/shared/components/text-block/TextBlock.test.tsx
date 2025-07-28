import { render, screen } from '@testing-library/react';
import { useEditor } from '@tiptap/react';
import React from 'react';

import TextBlock from './TextBlock';

jest.mock('@tiptap/react', () => ({
  useEditor: jest.fn(),
  EditorContent: ({ editor }: { editor: object | null }) => (editor ? <div data-testid="editor-content" /> : null)
}));

describe('TextBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render EditorContent when editor is defined', () => {
    (useEditor as jest.Mock).mockReturnValue({});
    render(<TextBlock content="<p>Hello</p>" />);
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
  });

  it('should pass className and other props to the root div', () => {
    (useEditor as jest.Mock).mockReturnValue({});
    render(<TextBlock content="<p>Test</p>" className="custom-class" data-testid="root-div" />);
    const root = screen.getByTestId('root-div');
    expect(root).toHaveClass('custom-class');
  });

  it('should not render anything if editor is null', () => {
    (useEditor as jest.Mock).mockReturnValue(null);
    const { container } = render(<TextBlock content="<p>Empty</p>" />);
    expect(container.firstChild).toBeNull();
  });
});
