import { render, screen } from '@testing-library/react';

import TitleContentBlock from './TittleContentBlock';

describe('TitleContentBlock component', () => {
  const defaultProps = {
    title: 'Test Title',
    content: 'This is test content'
  };

  it('should render props correctly', () => {
    render(<TitleContentBlock {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title').tagName).toBe('H5');
    expect(screen.getByText('This is test content')).toBeInTheDocument();
  });

  it('should render ContentBlock component', () => {
    render(<TitleContentBlock {...defaultProps} />);
    expect(screen.getByTestId('TitleContentBlock-contentBlock')).toBeInTheDocument();
  });
});
