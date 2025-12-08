import { render, screen, within } from '@testing-library/react';
import React from 'react';

import EventItem, { type EventItemProps } from './EventItem';
import { MOCK_EVENT_ITEMS } from './EventItem.fixture';

jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => {
    if (key === 'publishedAtLabel') {
      return 'Опубліковано:';
    }

    return key;
  }
}));

describe('EventItem', () => {
  const { props: baseProps } = MOCK_EVENT_ITEMS[0];

  const assertTwoTimeElementsWithDate = (expectedDate: string) => {
    const dateBlock = screen.getByTestId('EventItem-dateBlock');
    expect(dateBlock).toBeInTheDocument();

    const timeElements = dateBlock.querySelectorAll('time');
    expect(timeElements).toHaveLength(2);
    timeElements.forEach((element) => {
      expect(element).toHaveAttribute('dateTime', expectedDate);
    });

    return dateBlock;
  };

  const expectNoStatusOrDates = (dateBlock: HTMLElement) => {
    expect(screen.queryByTestId('EventItem-status')).toBeNull();
    expect(screen.queryByTestId('EventItem-dateRange')).toBeNull();
    expect(screen.queryByTestId('EventItem-year')).toBeNull();
    expect(dateBlock.querySelectorAll('time')).toHaveLength(0);
    expect(dateBlock).not.toHaveAttribute('aria-label');
  };

  it('renders main content for an active event with a date range', () => {
    render(<EventItem {...baseProps} />);

    expect(screen.getByTestId('EventItem-root')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: baseProps.title
      })
    ).toBeInTheDocument();

    expect(screen.getByTestId('EventItem-publishedAt')).toHaveTextContent('Опубліковано: 05.05.25');

    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(baseProps.image.alt)).toBeInTheDocument();
  });

  it('renders a multi-day date range in the correct format', () => {
    const props: EventItemProps = {
      ...baseProps,
      statusLabel: undefined,
      date: {
        startDate: '2025-02-29',
        endDate: '2025-03-01'
      }
    };

    render(<EventItem {...props} />);

    const dateBlock = assertTwoTimeElementsWithDate('2025-02-29');

    expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent('29.02 – 01.03');
    expect(screen.getByTestId('EventItem-year')).toHaveTextContent('2025');
    expect(dateBlock).toHaveAttribute('aria-label', '29.02 – 01.03 2025');
  });

  it('renders a single-day date correctly when endDate is not provided', () => {
    const props: EventItemProps = {
      ...baseProps,
      statusLabel: undefined,
      date: {
        startDate: '2024-03-05'
      }
    };

    render(<EventItem {...props} />);

    const dateBlock = assertTwoTimeElementsWithDate('2024-03-05');

    expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent('05.03');
    expect(screen.getByTestId('EventItem-year')).toHaveTextContent('2024');
    expect(dateBlock).toHaveAttribute('aria-label', '05.03 2024');
  });

  it('renders no date or status when neither is provided', () => {
    const props: EventItemProps = {
      ...baseProps,
      date: undefined,
      statusLabel: undefined
    };

    render(<EventItem {...props} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');

    expectNoStatusOrDates(dateBlock);
  });

  it('wraps the image in a link pointing to href', () => {
    render(<EventItem {...baseProps} />);

    const imageLink = screen.getByRole('link', { name: baseProps.title });
    expect(imageLink).toHaveAttribute('href', baseProps.href);

    const imageInsideLink = within(imageLink).getByAltText(baseProps.image.alt);
    expect(imageInsideLink).toBeInTheDocument();
  });

  it('renders primary and secondary CTAs when two actions are provided', () => {
    render(<EventItem {...baseProps} />);

    const [primaryAction, secondaryAction] = baseProps.actions!;

    const primaryLink = screen.getByText(primaryAction.label).closest('a');
    expect(primaryLink).not.toBeNull();
    expect(primaryLink).toHaveAttribute('href', primaryAction.href);

    const secondaryLink = screen.getByText(secondaryAction.label).closest('a');
    expect(secondaryLink).not.toBeNull();
    expect(secondaryLink).toHaveAttribute('href', secondaryAction.href);
  });

  it('renders only primary CTA when a single action is provided', () => {
    const singleActionProps: EventItemProps = {
      ...baseProps,
      actions: baseProps.actions ? [baseProps.actions[0]] : undefined
    };

    render(<EventItem {...singleActionProps} />);

    const primaryAction = singleActionProps.actions![0];

    const primaryLink = screen.getByText(primaryAction.label).closest('a');
    expect(primaryLink).not.toBeNull();
    expect(primaryLink).toHaveAttribute('href', primaryAction.href);

    expect(screen.queryByTestId('EventItem-secondaryCta')).toBeNull();
  });

  it('does not render CTAs when actions are not provided', () => {
    const withoutActions: EventItemProps = {
      ...baseProps,
      actions: undefined
    };

    render(<EventItem {...withoutActions} />);

    expect(screen.queryByTestId('EventItem-primaryCta')).toBeNull();
    expect(screen.queryByTestId('EventItem-secondaryCta')).toBeNull();
  });

  it('renders status instead of date when statusLabel is provided', () => {
    const statusProps: EventItemProps = {
      ...baseProps,
      date: {
        startDate: '2024-03-05',
        endDate: '2024-03-06'
      },
      statusLabel: 'Завершена подія'
    };

    render(<EventItem {...statusProps} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');

    expect(screen.getByTestId('EventItem-status')).toHaveTextContent('Завершена подія');

    expect(dateBlock.querySelectorAll('time')).toHaveLength(0);
    expect(screen.queryByTestId('EventItem-dateRange')).toBeNull();
    expect(screen.queryByTestId('EventItem-year')).toBeNull();

    expect(dateBlock).toHaveAttribute('aria-label', 'Завершена подія');
  });

  it('does not make the left date/status block clickable', () => {
    render(<EventItem {...baseProps} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');
    expect(dateBlock.querySelector('a')).toBeNull();
  });

  it('does not render dates when startDate is invalid ISO', () => {
    const props: EventItemProps = {
      ...baseProps,
      statusLabel: undefined,
      date: {
        startDate: 'not-a-date'
      }
    };

    render(<EventItem {...props} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');

    expectNoStatusOrDates(dateBlock);
  });
});
