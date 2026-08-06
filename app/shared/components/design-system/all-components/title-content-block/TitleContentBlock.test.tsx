import { render, screen } from '@testing-library/react';

import TitleContentBlock from './TittleContentBlock';

const defaultProps = {
  title: 'Test Title',
  content: 'This is test content'
};

describe('TitleContentBlock component', () => {
  it('should render props correctly', () => {
    render(<TitleContentBlock {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 3, name: defaultProps.title })).toBeInTheDocument();
    expect(screen.getByText('This is test content')).toBeInTheDocument();
  });

  it('should render ContentBlock component', () => {
    render(<TitleContentBlock {...defaultProps} />);
    expect(screen.getByTestId('TitleContentBlock-contentBlock')).toBeInTheDocument();
  });
});
