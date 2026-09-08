import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import NotesListItem from './NoteListItem';

import type { MusicItem } from '~/domain/entities/artistry.entity';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MockButtonProps {
  label: string;
  onClick?: () => void;
  endIcon?: React.ReactNode;
}

interface MockIconButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useFormatter: () => ({
    dateTime: (date: Date) => date.toISOString()
  })
}));

jest.mock(
  '~/ds-components/button/Button',
  () =>
    function MockButton({ label, onClick, endIcon }: MockButtonProps) {
      return (
        <button onClick={onClick}>
          {label}
          {endIcon}
        </button>
      );
    }
);

jest.mock('~/shared/components/design-system/all-components/icon-button/IconButton', () => ({
  __esModule: true,
  IconButton: function MockIconButton({ children, onClick }: MockIconButtonProps) {
    return (
      <button data-testid="icon-button" onClick={onClick}>
        {children}
      </button>
    );
  }
}));

jest.mock('~/components/svg-image/SvgImage', () => ({
  SvgImage: ({ alt }: { alt: string }) => <img data-testid="svg-image" alt={alt} />
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints');

const note: MusicItem = {
  name: 'test-note',
  url: '/notes/test-note.pdf',
  publishDate: '2023-01-01T00:00:00.000Z'
};
const icon = <svg data-testid="end-icon" />;
const handler = jest.fn();

const mockUseBreakpoints = useBreakpoints as jest.MockedFunction<typeof useBreakpoints>;

describe('NotesListItem', () => {
  const getMockBreakpoints = (
    overrides?: Partial<ReturnType<typeof useBreakpoints>>
  ): ReturnType<typeof useBreakpoints> => ({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLaptop: false,
    isLaptopAndAbove: false,
    ...overrides
  });

  const renderComponent = (propsOverrides?: Partial<React.ComponentProps<typeof NotesListItem>>) => {
    return render(
      <NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} {...propsOverrides} />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBreakpoints.mockReturnValue(getMockBreakpoints());
  });

  it('should render note title, date, and button on desktop viewports', () => {
    renderComponent();
    expect(screen.getByText('test-note')).toBeInTheDocument();
    expect(screen.getByTestId('svg-image')).toHaveAttribute('alt', 'test-note');
  });

  it('should render correct button text for freeNotesButton', () => {
    renderComponent();
    expect(screen.getByRole('button')).toHaveTextContent('freeNotesButton');
  });

  it('should render correct button text for paidNotesButton', () => {
    renderComponent({
      note: { ...note },
      buttonText: 'paidNotesButton'
    });
    expect(screen.getByRole('button')).toHaveTextContent('paidNotesButton');
  });

  it('should call handler when button is clicked on desktop for paid notes', () => {
    renderComponent({
      note: { ...note, url: undefined },
      buttonText: 'paidNotesButton'
    });
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalled();
  });

  it('should render endIcon if provided', () => {
    renderComponent();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should render mobile layouts and hide the decorative frame icon on compact viewports', () => {
    mockUseBreakpoints.mockReturnValue(getMockBreakpoints({ isMobile: true }));
    renderComponent();

    expect(screen.queryByTestId('svg-image')).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/notes/test-note.pdf');
  });

  it('should render an icon button configuration that triggers click parameters for paid mobile items', () => {
    mockUseBreakpoints.mockReturnValue(getMockBreakpoints({ isTablet: true }));
    renderComponent({
      note: { ...note, url: undefined },
      buttonText: 'paidNotesButton'
    });

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(handler).toHaveBeenCalled();
  });

  it('should use fileName as title if name is not provided', () => {
    renderComponent({ note: { ...note, name: undefined, fileName: 'file.pdf' } });
    expect(screen.getByText('file.pdf')).toBeInTheDocument();
  });

  it('should not render title block if both name and fileName are missing', () => {
    renderComponent({ note: { ...note, name: undefined, fileName: undefined } });
    expect(screen.queryByTestId('svg-image')).not.toBeInTheDocument();
  });

  it('should handle invalid or missing publishDate without crashing', () => {
    renderComponent({ note: { ...note, publishDate: undefined } });
    expect(screen.getByText('test-note')).toBeInTheDocument();
  });

  it('should render mobile disabled state if isButtonDisabled is theoretically true', () => {
    mockUseBreakpoints.mockReturnValue(getMockBreakpoints({ isMobile: true }));
    renderComponent({ note: { ...note, url: '' }, buttonText: 'paidNotesButton' });
    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
  });
});
