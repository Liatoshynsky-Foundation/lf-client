import { render, screen } from '@testing-library/react';

import CardWithText from './CardWithText';

describe('CardWithText', () => {
  const smallList = ['Інтерв’ю та аналітика', 'Музична критика', 'Залучення медіа', 'Переклади матеріалів'];
  const extendedList = [
    'Звукове обладнання',
    'Онлайн-трансляції',
    'Логістика подій',
    'Оцифрування архівів',
    'Інтерв’ю та аналітика',
    'Музична критика',
    'Залучення медіа',
    'Переклади матеріалів'
  ];

  it('should render the component with the necessary props', () => {
    render(<CardWithText title="Some title" list={smallList} />);
    expect(screen.getByText('Some title')).toBeInTheDocument();
    for (const item of smallList) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('should render the main icon if the prop icon is passed', () => {
    render(<CardWithText title="Some title" list={smallList} icon="/icons/test-icon.svg" />);
    expect(screen.getByAltText('Bullet icon')).toBeInTheDocument();
  });

  it('should not render the main icon if icon prop is not passed', () => {
    render(<CardWithText title="Some title" list={smallList} />);
    const mainIcon = screen.queryAllByAltText('Bullet icon');
    expect(mainIcon.length).toBe(0);
  });

  it('should render all list items with correct number of list bullet icons', () => {
    render(<CardWithText title="Some title" list={smallList} />);
    const bullets = screen.getAllByAltText('List bullet icon');
    expect(bullets.length).toBe(smallList.length);
  });

  it('should render all list items for extended list', () => {
    render(<CardWithText title="Some title" list={extendedList} />);
    for (const item of extendedList) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    const bullets = screen.getAllByAltText('List bullet icon');
    expect(bullets.length).toBe(extendedList.length);
  });
});
