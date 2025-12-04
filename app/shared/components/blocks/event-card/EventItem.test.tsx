import { render, screen, within } from '@testing-library/react';
import React from 'react';

import EventItem, { type EventItemProps } from './EventItem';
import { MOCK_EVENT_ITEMS } from './EventItem.fixture';

describe('EventItem', () => {
  const { props: baseProps } = MOCK_EVENT_ITEMS[0];

  it('renders main content for an active event with a date range', () => {
    render(<EventItem {...baseProps} />);

    expect(screen.getByTestId('EventItem-root')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: baseProps.title
      })
    ).toBeInTheDocument();

    expect(screen.getByText(baseProps.publishedAtLabel)).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();

    const dateBlock = screen.getByTestId('EventItem-dateBlock');
    expect(dateBlock).toBeInTheDocument();

    const timeElements = dateBlock.querySelectorAll('time');
    expect(timeElements).toHaveLength(2);
    timeElements.forEach((element) => {
      expect(element).toHaveAttribute('dateTime', baseProps.date!.startDate);
    });

    expect(screen.getByAltText(baseProps.image.alt)).toBeInTheDocument();
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

  it('renders a single-day date correctly when endDate is not provided', () => {
    const singleDayProps: EventItemProps = {
      ...baseProps,
      date: {
        startDate: '2024-03-05'
      }
    };

    render(<EventItem {...singleDayProps} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');
    expect(dateBlock).toBeInTheDocument();

    const timeElements = dateBlock.querySelectorAll('time');
    expect(timeElements).toHaveLength(2);
    timeElements.forEach((element) => {
      expect(element).toHaveAttribute('dateTime', '2024-03-05');
    });
  });

  it('renders status instead of date when statusLabel is provided', () => {
    const statusProps: EventItemProps = {
      ...baseProps,
      date: undefined,
      statusLabel: 'Завершена подія'
    };

    render(<EventItem {...statusProps} />);

    const leftBlock = screen.getByTestId('EventItem-left');
    expect(leftBlock).toBeInTheDocument();

    expect(screen.getByTestId('EventItem-status')).toHaveTextContent('Завершена подія');

    const timeElements = screen.getByTestId('EventItem-dateBlock').querySelectorAll('time');
    expect(timeElements).toHaveLength(0);
  });

  it('does not make the left date/status block clickable', () => {
    render(<EventItem {...baseProps} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');

    expect(dateBlock.querySelector('a')).toBeNull();
  });
});
