import { render, screen } from '@testing-library/react';

import { PossibleBlocks } from '../../page-builder/PageBuilder';
import { BlockRenderer, BlockRendererProps } from './BlockRenderer';

const mockedBlocks = {
  IntroSection: {}
} as unknown as PossibleBlocks;

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

  it('should NOT render a Component if blockId is NOT a key in rendererMap', () => {
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
});
