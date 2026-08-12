import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import CopyLink from './CopyLink';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      copied: 'Copied!'
    };
    return translations[key] || key;
  }
}));

type MockSvgProps = {
  alt?: string;
  Component?: React.ComponentType;
  [key: string]: unknown;
};

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ alt, Component, ...props }: MockSvgProps) => (
    <svg data-testid="CopyLink-icon" aria-label={alt} {...props}>
      {Component?.name || 'CopyIcon'}
    </svg>
  )
}));

type MockTooltipProps = {
  children?: React.ReactNode;
  title?: string;
  isOpen?: boolean;
};

jest.mock('~/ds-components/tooltip/Tooltip', () => ({
  __esModule: true,
  default: ({ children, title, isOpen }: MockTooltipProps) => (
    <div data-testid="CopyLink-tooltip" data-title={title} data-open={isOpen}>
      {children}
    </div>
  )
}));

const mockedUseBreakpoints = useBreakpoints as jest.Mock;

describe('CopyLink', () => {
  let mockWriteText: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
    mockWriteText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText
      },
      writable: true,
      configurable: true
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockWriteText.mockClear();
    mockedUseBreakpoints.mockReturnValue({ isMobile: false });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('Desktop behavior', () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    });

    it('should render the value as text', () => {
      render(<CopyLink value="test@example.com" />);
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('should render with numeric value', () => {
      render(<CopyLink value={123456} />);
      expect(screen.getByText('123456')).toBeInTheDocument();
    });

    it('should render copy icon', () => {
      render(<CopyLink value="test" />);
      expect(screen.getByTestId('CopyLink-icon')).toBeInTheDocument();
    });

    it('should have aria-disabled attribute when disabled', () => {
      render(<CopyLink value="test" disabled />);
      const button = screen.getByTestId('CopyLink');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not have aria-disabled="true" when not disabled', () => {
      render(<CopyLink value="test" />);
      const button = screen.getByTestId('CopyLink');
      expect(button).toHaveAttribute('aria-disabled', 'false');
    });

    it('should render with small size', () => {
      render(<CopyLink value="test" size="small" />);
      const icon = screen.getByTestId('CopyLink-icon');
      expect(icon).toHaveAttribute('width', '16px');
      expect(icon).toHaveAttribute('height', '16px');
    });

    it('should render with medium size by default', () => {
      render(<CopyLink value="test" />);
      const icon = screen.getByTestId('CopyLink-icon');
      expect(icon).toHaveAttribute('width', '20px');
      expect(icon).toHaveAttribute('height', '20px');
    });

    it('should render with large size', () => {
      render(<CopyLink value="test" size="large" />);
      const icon = screen.getByTestId('CopyLink-icon');
      expect(icon).toHaveAttribute('width', '24px');
      expect(icon).toHaveAttribute('height', '24px');
    });

    it('should render with primary type by default', () => {
      render(<CopyLink value="test" />);
      const icon = screen.getByTestId('CopyLink-icon');
      expect(icon).toHaveAttribute('stroke', 'black');
    });

    it('should render with secondary type', () => {
      render(<CopyLink value="test" type="secondary" />);
      const icon = screen.getByTestId('CopyLink-icon');
      expect(icon).toHaveAttribute('stroke', 'blue.800');
    });

    it('should render with disabled styling for primary type', () => {
      render(<CopyLink value="test" disabled type="primary" />);
      const icon = screen.getByTestId('CopyLink-icon');
      expect(icon).toHaveAttribute('stroke', 'blue.500');
    });

    it('should render with disabled styling for secondary type', () => {
      render(<CopyLink value="test" disabled type="secondary" />);
      const icon = screen.getByTestId('CopyLink-icon');
      expect(icon).toHaveAttribute('stroke', 'blue.500');
    });

    it('should apply custom sx styles', () => {
      render(<CopyLink value="test" sx={{ color: 'red', fontSize: '24px' }} />);
      const button = screen.getByTestId('CopyLink');
      expect(button).toBeInTheDocument();
    });

    it('should render tooltip component', () => {
      render(<CopyLink value="test" />);
      expect(screen.getByTestId('CopyLink-tooltip')).toBeInTheDocument();
    });

    it('should copy to clipboard when clicked', async () => {
      render(<CopyLink value="test@example.com" />);
      const button = screen.getByTestId('CopyLink');

      fireEvent.click(button);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('test@example.com');
        expect(mockWriteText).toHaveBeenCalledTimes(1);
      });
    });

    it('should show tooltip when copied', async () => {
      render(<CopyLink value="test" />);
      const button = screen.getByTestId('CopyLink');

      fireEvent.click(button);

      await waitFor(() => {
        const tooltip = screen.getByTestId('CopyLink-tooltip');
        expect(tooltip).toHaveAttribute('data-open', 'true');
      });
    });

    it('should hide tooltip after delay', async () => {
      render(<CopyLink value="test" delay={1000} />);
      const button = screen.getByTestId('CopyLink');

      fireEvent.click(button);

      await waitFor(() => {
        const tooltip = screen.getByTestId('CopyLink-tooltip');
        expect(tooltip).toHaveAttribute('data-open', 'true');
      });

      React.act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        const tooltip = screen.getByTestId('CopyLink-tooltip');
        expect(tooltip).toHaveAttribute('data-open', 'false');
      });
    });

    it('should show custom hint message', async () => {
      render(<CopyLink value="test" hint="Custom copied!" />);
      const button = screen.getByTestId('CopyLink');

      fireEvent.click(button);

      await waitFor(() => {
        const tooltip = screen.getByTestId('CopyLink-tooltip');
        expect(tooltip).toHaveAttribute('data-title', 'Custom copied!');
      });
    });

    it.each([
      { key: 'Enter', code: 'Enter', description: 'Enter key' },
      { key: ' ', code: 'Space', description: 'Space key' }
    ])('should copy when $description is pressed', async ({ key, code }) => {
      render(<CopyLink value="test@example.com" />);
      const button = screen.getByTestId('CopyLink');

      fireEvent.keyDown(button, { key, code });

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('test@example.com');
      });
    });

    it('should not copy when other keys are pressed', async () => {
      render(<CopyLink value="test@example.com" />);
      const button = screen.getByTestId('CopyLink');

      fireEvent.keyDown(button, { key: 'a', code: 'KeyA' });

      expect(mockWriteText).not.toHaveBeenCalled();
    });

    it('should not copy to clipboard when disabled', async () => {
      render(<CopyLink value="test@example.com" disabled />);
      const button = screen.getByTestId('CopyLink');

      fireEvent.click(button);

      await waitFor(() => {
        expect(mockWriteText).not.toHaveBeenCalled();
      });
    });

    it('should have tabIndex -1 when disabled', () => {
      render(<CopyLink value="test" disabled />);
      const button = screen.getByTestId('CopyLink');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('should have tabIndex 0 when not disabled', () => {
      render(<CopyLink value="test" />);
      const button = screen.getByTestId('CopyLink');
      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Mobile behavior', () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: true });
    });

    it('should render as link on mobile', () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should render mailto link for email type', () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('should render tel link for phone type', () => {
      render(<CopyLink value="+1234567890" hrefType="phone" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'tel:+1234567890');
    });

    it('should render as Typography when hrefType is not provided', () => {
      render(<CopyLink value="test" />);
      const text = screen.getByText('test');
      expect(text).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should not have copy functionality on mobile', () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);
      expect(screen.queryByTestId('CopyLink')).not.toBeInTheDocument();
      expect(mockWriteText).not.toHaveBeenCalled();
    });

    it('should not render copy icon on mobile', () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);
      expect(screen.queryByTestId('CopyLink-icon')).not.toBeInTheDocument();
    });

    it('should not render tooltip on mobile', () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);
      expect(screen.queryByTestId('CopyLink-tooltip')).not.toBeInTheDocument();
    });

    it('should render with small size on mobile', () => {
      render(<CopyLink value="test" hrefType="email" size="small" />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('MuiTypography-customSemiBold16');
    });

    it('should render with medium size on mobile', () => {
      render(<CopyLink value="test" hrefType="email" />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('MuiTypography-customSemiBold16');
    });

    it('should render with large size on mobile', () => {
      render(<CopyLink value="test" hrefType="email" size="large" />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('MuiTypography-customSemiBold20');
    });

    it('should apply disabled styles on mobile', () => {
      render(<CopyLink value="test" hrefType="email" disabled />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should render numeric value on mobile', () => {
      render(<CopyLink value={123456} hrefType="phone" />);
      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('123456');
      expect(link).toHaveAttribute('href', 'tel:123456');
    });

    it('should apply custom sx styles on mobile', () => {
      render(<CopyLink value="test" hrefType="email" sx={{ color: 'blue' }} />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Typography variants', () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    });

    it('should use customSemiBold16 variant for small size', () => {
      render(<CopyLink value="test" size="small" />);
      const text = screen.getByTestId('CopyLink-text');
      expect(text).toHaveClass('MuiTypography-customSemiBold16');
    });

    it('should use customSemiBold16 variant for medium size', () => {
      render(<CopyLink value="test" size="medium" />);
      const text = screen.getByTestId('CopyLink-text');
      expect(text).toHaveClass('MuiTypography-customSemiBold16');
    });

    it('should use customSemiBold20 variant for large size', () => {
      render(<CopyLink value="test" size="large" />);
      const text = screen.getByTestId('CopyLink-text');
      expect(text).toHaveClass('MuiTypography-customSemiBold20');
    });
  });

  describe('Edge cases', () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    });

    it('should handle zero as value', () => {
      render(<CopyLink value={0} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle very long text value', () => {
      const longValue = 'a'.repeat(1000);
      render(<CopyLink value={longValue} />);
      expect(screen.getByText(longValue)).toBeInTheDocument();
    });

    it('should handle special characters in value', () => {
      render(<CopyLink value="test@#$%^&*()" />);
      expect(screen.getByText('test@#$%^&*()')).toBeInTheDocument();
    });

    it('should render with empty string value', () => {
      render(<CopyLink value="" />);
      expect(screen.getByTestId('CopyLink-icon')).toBeInTheDocument();
    });

    it('should render with custom hint prop', () => {
      render(<CopyLink value="test" hint="Custom copied message" />);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('should render with custom delay prop', () => {
      render(<CopyLink value="test" delay={5000} />);
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  describe('Type and hrefType combinations', () => {
    it('should handle primary type with email hrefType on mobile', () => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: true });
      render(<CopyLink value="test@email.com" type="primary" hrefType="email" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'mailto:test@email.com');
    });

    it('should handle secondary type with phone hrefType on mobile', () => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: true });
      render(<CopyLink value="123456" type="secondary" hrefType="phone" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'tel:123456');
    });
  });
});
