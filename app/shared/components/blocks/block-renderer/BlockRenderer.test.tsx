import { render, screen } from '@testing-library/react';

import { BlockRenderer, BlockRendererProps } from './BlockRenderer';

const mockedBlocks = {
  IntroSection: {}
};

const MockIntroSectionBlock = ({ title }: any) => (
  <div data-testid="intro-section">
    IntroSection
    {title && <div data-testid="intro-section-title">{title}</div>}
  </div>
);

const defaultProps: BlockRendererProps<typeof mockedBlocks> = {
  blockId: 'IntroSection',
  blocks: mockedBlocks,
  rendererMap: {
    IntroSection: MockIntroSectionBlock
  }
};

const namesMap: Record<string, 'IntroSection'> = {
  intro: 'IntroSection'
};

const runSimulation = (props: Partial<BlockRendererProps<typeof mockedBlocks>> = {}) => {
  render(<BlockRenderer {...defaultProps} {...props} />);
};

describe('BlockRenderer', () => {
  it('should render a Component if blockId is a key in rendererMap', () => {
    runSimulation();

    expect(screen.getByTestId('intro-section')).toHaveTextContent('IntroSection');
    expect(screen.queryByTestId('intro-section-title')).not.toBeInTheDocument();
  });

  it('should render a Component if blockId is a key in namesMap', () => {
    runSimulation({ blockId: 'intro', namesMap });

    expect(screen.getByTestId('intro-section')).toHaveTextContent('IntroSection');
    expect(screen.queryByTestId('intro-section-title')).not.toBeInTheDocument();
  });

  it('should NOT render a Component if blockId is NOT a key in rendererMap & namesMap is missing', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const blockId = 'non-existed-id';

    runSimulation({ blockId });

    expect(screen.queryByTestId('intro-section')).not.toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(`Block ID "${blockId}" is missing from BLOCKS_RENDERER`);
    expect(screen.queryByTestId('intro-section-title')).not.toBeInTheDocument();

    warnSpy.mockRestore();
  });

  it('should display title in a rendered Component if title is provided', () => {
    const title = 'title to display';
    runSimulation({ title });

    expect(screen.getByTestId('intro-section')).toHaveTextContent('IntroSection');
    expect(screen.getByTestId('intro-section-title')).toHaveTextContent(title);
  });

  it('should NOT render a Component if its block data is marked as hidden', () => {
    runSimulation({ blocks: { IntroSection: { hidden: true } } });

    expect(screen.queryByTestId('intro-section')).not.toBeInTheDocument();
  });

  it('should render a Component if its block data is not marked as hidden', () => {
    runSimulation({ blocks: { IntroSection: { hidden: false } } });

    expect(screen.getByTestId('intro-section')).toBeInTheDocument();
  });
});
