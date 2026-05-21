import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';

import type { ArticleDetailProps } from '~/components/blocks/article-detail/ArticleDetail';

import EventDetailPage, { generateMetadata } from './page';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { formatIsoDateToDdMmYy, parseIsoDate } from '~/lib/utils/parseIsoDate';

const mockGetEventBySlug = jest.fn();

let capturedArticleDetailProps: ArticleDetailProps | undefined;

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NOT_FOUND');
  })
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getLocale: jest.fn(),
  getTranslations: jest.fn().mockResolvedValue((key: string) => key)
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: jest.fn(() => ({
      getEventBySlug: mockGetEventBySlug
    }))
  }))
}));

jest.mock('~/lib/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((config) => config)
}));

jest.mock('~/lib/utils/parseIsoDate', () => ({
  formatIsoDateToDdMmYy: jest.fn(),
  parseIsoDate: jest.fn()
}));

jest.mock('~/components/blocks/article-detail/ArticleDetail', () => ({
  ArticleDetail: (props: ArticleDetailProps) => {
    capturedArticleDetailProps = props;
    return <div data-testid="ArticleDetail" />;
  }
}));

const mockedNotFound = notFound as unknown as jest.Mock;
const mockedCreateSeoMeta = createSeoMeta as unknown as jest.Mock;
const mockedFormatDate = formatIsoDateToDdMmYy as jest.Mock;
const mockedParseIsoDate = parseIsoDate as jest.Mock;

const mockBlocks = [
  { id: '1', type: 'paragraph', props: {}, content: [{ type: 'text', text: 'Hello', styles: {} }], children: [] }
];

const mockEvent = {
  title: 'Тестова подія',
  description: 'Опис тестової події',
  coverImage: { src: 'https://example.com/image.jpg' },
  publishedAt: '2024-05-01T00:00:00.000Z',
  eventDateTimeStart: '2024-05-10T16:00:00.000Z',
  eventDateTimeEnd: '2024-05-10T18:00:00.000Z',
  ticketUrl: 'https://tickets.example.com',
  eventLink: null,
  content: { content: { blocks: mockBlocks } }
};

// ─── generateMetadata ────────────────────────────────────────────────────────

describe('generateMetadata', () => {
  beforeEach(() => {
    mockGetEventBySlug.mockReset();
    mockedCreateSeoMeta.mockClear();
  });

  it('returns full metadata when event is found', async () => {
    mockGetEventBySlug.mockResolvedValue(mockEvent);

    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });

    expect(mockGetEventBySlug).toHaveBeenCalledWith('test-slug', 'uk');
    expect(mockedCreateSeoMeta).toHaveBeenCalledWith({
      title: mockEvent.title,
      description: mockEvent.description,
      url: '/events/test-slug',
      imageUrl: mockEvent.coverImage.src,
      locale: 'uk'
    });
    expect(metadata).toEqual(expect.objectContaining({ title: mockEvent.title }));
  });

  it('returns fallback metadata when event is not found', async () => {
    mockGetEventBySlug.mockResolvedValue(null);

    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'uk', slug: 'missing-slug' })
    });

    expect(mockedCreateSeoMeta).toHaveBeenCalledWith({
      title: 'Event not found',
      description: '',
      url: '/events/missing-slug',
      locale: 'uk'
    });
    expect(metadata).toEqual(expect.objectContaining({ title: 'Event not found' }));
  });
});

// ─── EventDetailPage ─────────────────────────────────────────────────────────

describe('EventDetailPage', () => {
  beforeEach(() => {
    mockGetEventBySlug.mockReset();
    mockedNotFound.mockClear();
    mockedFormatDate.mockReset();
    mockedParseIsoDate.mockReset();
    capturedArticleDetailProps = undefined;

    const { getLocale } = jest.requireMock('next-intl/server');
    (getLocale as jest.Mock).mockResolvedValue('uk');
  });

  it('calls notFound when event is not found', async () => {
    mockGetEventBySlug.mockResolvedValue(null);

    await expect(EventDetailPage({ params: Promise.resolve({ lang: 'uk', slug: 'missing-slug' }) })).rejects.toThrow(
      'NOT_FOUND'
    );

    expect(mockedNotFound).toHaveBeenCalledTimes(1);
    expect(capturedArticleDetailProps).toBeUndefined();
  });

  it('renders ArticleDetail with correct props when event is found', async () => {
    mockGetEventBySlug.mockResolvedValue(mockEvent);
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    expect(screen.getByTestId('ArticleDetail')).toBeInTheDocument();
    expect(mockedNotFound).not.toHaveBeenCalled();

    const props = capturedArticleDetailProps!;
    expect(props.lang).toBe('uk');
    expect(props.title).toBe(mockEvent.title);
    expect(props.date).toBe('01.05.24');
    expect(props.blocks).toEqual(mockBlocks);
    expect(props.backPath).toBe('/news?tab=events');
  });

  it('passes empty blocks array when content is missing', async () => {
    mockGetEventBySlug.mockResolvedValue({ ...mockEvent, content: {} });
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    expect(capturedArticleDetailProps!.blocks).toEqual([]);
  });

  it('passes empty string as date when publishedAt is null', async () => {
    mockGetEventBySlug.mockResolvedValue({ ...mockEvent, publishedAt: null });

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    expect(capturedArticleDetailProps!.date).toBe('');
    expect(mockedFormatDate).not.toHaveBeenCalled();
  });

  it('uses lang from params for fetching event', async () => {
    mockGetEventBySlug.mockResolvedValue(mockEvent);
    mockedFormatDate.mockReturnValue('01.05.24');

    await EventDetailPage({ params: Promise.resolve({ lang: 'uk', slug: 'test-slug' }) });

    expect(mockGetEventBySlug).toHaveBeenCalledWith('test-slug', 'uk');
  });

  it('provides registrationBlock when eventDateTimeStart is set without registerUrl', async () => {
    mockGetEventBySlug.mockResolvedValue({
      ...mockEvent,
      ticketUrl: null,
      eventLink: null
    });
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    expect(capturedArticleDetailProps!.registrationBlock).toBeDefined();
  });

  it('provides registrationBlock when registerUrl is set without eventDateTimeStart', async () => {
    mockGetEventBySlug.mockResolvedValue({
      ...mockEvent,
      eventDateTimeStart: null,
      eventDateTimeEnd: null,
      ticketUrl: 'https://tickets.example.com'
    });
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    expect(capturedArticleDetailProps!.registrationBlock).toBeDefined();
  });

  it('registrationBlock is undefined when neither dateTimeStart nor registerUrl', async () => {
    mockGetEventBySlug.mockResolvedValue({
      ...mockEvent,
      eventDateTimeStart: null,
      eventDateTimeEnd: null,
      ticketUrl: null,
      eventLink: null
    });

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    expect(capturedArticleDetailProps!.registrationBlock).toBeUndefined();
  });

  it('prefers ticketUrl over eventLink as registerUrl', async () => {
    mockGetEventBySlug.mockResolvedValue({
      ...mockEvent,
      ticketUrl: 'https://tickets.example.com',
      eventLink: 'https://eventlink.example.com'
    });
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    const { getByRole } = render(capturedArticleDetailProps!.registrationBlock as React.ReactElement);
    expect(getByRole('link')).toHaveAttribute('href', 'https://tickets.example.com');
  });

  it('falls back to eventLink when ticketUrl is null', async () => {
    mockGetEventBySlug.mockResolvedValue({
      ...mockEvent,
      ticketUrl: null,
      eventLink: 'https://eventlink.example.com'
    });
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await EventDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });
    render(jsx);

    const { getByRole } = render(capturedArticleDetailProps!.registrationBlock as React.ReactElement);
    expect(getByRole('link')).toHaveAttribute('href', 'https://eventlink.example.com');
  });
});

// ─── EventRegistrationBlock ───────────────────────────────────────────────────

describe('EventRegistrationBlock', () => {
  beforeEach(() => {
    mockGetEventBySlug.mockReset();
    mockedFormatDate.mockReset();
    mockedParseIsoDate.mockReset();
    capturedArticleDetailProps = undefined;

    const { getLocale } = jest.requireMock('next-intl/server');
    (getLocale as jest.Mock).mockResolvedValue('uk');
  });

  const renderRegistrationBlock = async (
    eventOverrides: Record<string, unknown> = {},
    mockOpts: { date?: string | null; parsed?: Record<string, string> | null } = {}
  ) => {
    mockGetEventBySlug.mockResolvedValue({ ...mockEvent, ...eventOverrides });
    mockedFormatDate.mockReturnValue('date' in mockOpts ? mockOpts.date : '10.05.24');
    mockedParseIsoDate.mockReturnValue(
      'parsed' in mockOpts ? mockOpts.parsed : { day: '10', month: '05', year: '2024' }
    );

    const jsx = await EventDetailPage({ params: Promise.resolve({ lang: 'uk', slug: 'test-slug' }) });
    render(jsx);

    return render(capturedArticleDetailProps!.registrationBlock as React.ReactElement);
  };

  it('shows date label and formatted date when parseIsoDate returns valid date', async () => {
    const { getByText } = await renderRegistrationBlock();

    expect(getByText('eventDateLabel')).toBeInTheDocument();
    expect(getByText('10.05.24')).toBeInTheDocument();
  });

  it('does not show date section when parseIsoDate returns null', async () => {
    const { queryByText } = await renderRegistrationBlock(
      { ticketUrl: 'https://tickets.example.com' },
      { parsed: null }
    );

    expect(queryByText('eventDateLabel')).not.toBeInTheDocument();
  });

  it('does not show date section when formatIsoDateToDdMmYy returns null', async () => {
    const { queryByText } = await renderRegistrationBlock({}, { date: null });

    expect(queryByText('eventDateLabel')).not.toBeInTheDocument();
  });

  it('shows time range HH:MM-HH:MM when both dateTimeStart and dateTimeEnd are provided', async () => {
    const { getByText } = await renderRegistrationBlock({
      eventDateTimeStart: '2024-05-10T16:00:00.000Z',
      eventDateTimeEnd: '2024-05-10T18:00:00.000Z'
    });

    expect(getByText('eventTimeLabel')).toBeInTheDocument();
    expect(getByText('16:00-18:00')).toBeInTheDocument();
  });

  it('shows only start time HH:MM when dateTimeEnd is null', async () => {
    const { getByText } = await renderRegistrationBlock({
      eventDateTimeStart: '2024-05-10T16:00:00.000Z',
      eventDateTimeEnd: null
    });

    expect(getByText('16:00')).toBeInTheDocument();
  });

  it('does not show time section when dateTimeStart has no valid time pattern', async () => {
    const { queryByText } = await renderRegistrationBlock({
      eventDateTimeStart: 'no-time-here',
      eventDateTimeEnd: null
    });

    expect(queryByText('eventTimeLabel')).not.toBeInTheDocument();
  });

  it('does not show time section when parseIsoDate returns null', async () => {
    const { queryByText } = await renderRegistrationBlock(
      { ticketUrl: 'https://tickets.example.com' },
      { parsed: null }
    );

    expect(queryByText('eventTimeLabel')).not.toBeInTheDocument();
  });

  it('shows register link with correct href and label', async () => {
    const { getByRole } = await renderRegistrationBlock({
      ticketUrl: 'https://tickets.example.com'
    });

    const link = getByRole('link');
    expect(link).toHaveAttribute('href', 'https://tickets.example.com');
    expect(link).toHaveTextContent('registerButton');
  });

  it('does not show register link when registerUrl is null', async () => {
    const { queryByRole } = await renderRegistrationBlock({
      ticketUrl: null,
      eventLink: null
    });

    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});
