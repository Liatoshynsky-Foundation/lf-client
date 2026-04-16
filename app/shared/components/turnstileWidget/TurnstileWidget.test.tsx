import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import TurnstileWidget from './TurnstileWidget';
import { ApiRoutes } from '~/constants/routes/api-routes';

jest.mock('react-cloudflare-turnstile', () => {
  return function MockTurnstile(props: any) {
    return (
      <div data-testid="cloudflare-turnstile">
        <span>Language: {props.language}</span>
        <span>SiteKey: {props.turnstileSiteKey}</span>
        <button onClick={() => props.callback('test-token')}>Simulate Success</button>
      </div>
    );
  };
});

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('TurnstileWidget', () => {
  const mockOnSuccessAction = jest.fn();
  const mockLanguage = 'uk' as any;
  const mockSiteKey = 'test-site-key-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null initially when siteKey is not fetched (covers !siteKey branch)', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({})
    });

    const { container } = render(<TurnstileWidget onSuccessAction={mockOnSuccessAction} language={mockLanguage} />);

    expect(container.firstChild).toBeNull();

    expect(mockFetch).toHaveBeenCalledWith(ApiRoutes.TURNSTILE);
  });

  it('should render Turnstile widget after successfully fetching siteKey', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ turnstileSiteKey: mockSiteKey })
    });

    render(<TurnstileWidget onSuccessAction={mockOnSuccessAction} language={mockLanguage} />);

    await waitFor(() => {
      expect(screen.getByTestId('cloudflare-turnstile')).toBeInTheDocument();
    });

    expect(screen.getByText(`Language: ${mockLanguage}`)).toBeInTheDocument();
    expect(screen.getByText(`SiteKey: ${mockSiteKey}`)).toBeInTheDocument();
  });

  it('should call onSuccessAction when Turnstile callback is triggered', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ turnstileSiteKey: mockSiteKey })
    });

    render(<TurnstileWidget onSuccessAction={mockOnSuccessAction} language={mockLanguage} />);

    await waitFor(() => {
      expect(screen.getByTestId('cloudflare-turnstile')).toBeInTheDocument();
    });

    const successButton = screen.getByText('Simulate Success');
    successButton.click();

    expect(mockOnSuccessAction).toHaveBeenCalledWith('test-token');
  });

  it('should not set siteKey if turnstileSiteKey is missing in response', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ someOtherData: 'data' })
    });

    const { container } = render(<TurnstileWidget onSuccessAction={mockOnSuccessAction} language={mockLanguage} />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    expect(container.firstChild).toBeNull();
  });
});
