import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ alt, Component, ...props }: any) => (
    <svg data-testid="copy-icon" aria-label={alt} {...props}>
      {Component?.name || 'CopyIcon'}
    </svg>
  )
}));

jest.mock('~/ds-components/tooltip/Tooltip', () => ({
  __esModule: true,
  default: ({ children, title, open }: any) => (
    <div data-testid="tooltip" data-title={title} data-open={open}>
      {children}
    </div>
  )
}));

const mockedUseBreakpoints = useBreakpoints as jest.Mock;

describe('CopyLink', () => {
  let mockWriteText: jest.Mock;

  beforeAll(() => {
    mockWriteText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText
      },
      writable: true,
      configurable: true
    });
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
      expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
    });

    it('should have aria-disabled attribute when disabled', () => {
      render(<CopyLink value="test" disabled />);
      const element = screen.getByText('test').parentElement;
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not have aria-disabled="true" when not disabled', () => {
      render(<CopyLink value="test" />);
      const element = screen.getByText('test').parentElement;
      expect(element).toHaveAttribute('aria-disabled', 'false');
    });

    it('should render with medium size by default', () => {
      render(<CopyLink value="test" />);
      const icon = screen.getByTestId('copy-icon');
      expect(icon).toHaveAttribute('width', '20px');
      expect(icon).toHaveAttribute('height', '20px');
    });

    it('should render with large size', () => {
      render(<CopyLink value="test" size="large" />);
      const icon = screen.getByTestId('copy-icon');
      expect(icon).toHaveAttribute('width', '24px');
      expect(icon).toHaveAttribute('height', '24px');
    });

    it('should render with primary type by default', () => {
      render(<CopyLink value="test" />);
      const icon = screen.getByTestId('copy-icon');
      expect(icon).toHaveAttribute('stroke', '#190d03');
    });

    it('should render with secondary type', () => {
      render(<CopyLink value="test" type="secondary" />);
      const icon = screen.getByTestId('copy-icon');
      expect(icon).toHaveAttribute('stroke', '#52545A');
    });

    it('should render with disabled styling for primary type', () => {
      render(<CopyLink value="test" disabled type="primary" />);
      const icon = screen.getByTestId('copy-icon');
      expect(icon).toHaveAttribute('stroke', '#9D9FA9');
    });

    it('should render with disabled styling for secondary type', () => {
      render(<CopyLink value="test" disabled type="secondary" />);
      const icon = screen.getByTestId('copy-icon');
      expect(icon).toHaveAttribute('stroke', '#9D9FA9');
    });

    it('should apply custom sx styles', () => {
      render(<CopyLink value="test" sx={{ color: 'red', fontSize: '24px' }} />);
      const element = screen.getByText('test').parentElement;
      expect(element).toBeInTheDocument();
    });

    it('should render tooltip component', () => {
      render(<CopyLink value="test" />);
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
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

    it('should render empty href when hrefType is not provided', () => {
      render(<CopyLink value="test" />);
      const link = screen.getByText('test').closest('a');
      expect(link).toHaveAttribute('href', '');
    });

    it('should not copy to clipboard on mobile when clicked', async () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);

      expect(mockWriteText).not.toHaveBeenCalled();
    });

    it('should not render copy icon on mobile', () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);
      expect(screen.queryByTestId('copy-icon')).not.toBeInTheDocument();
    });

    it('should not render tooltip on mobile', () => {
      render(<CopyLink value="test@example.com" hrefType="email" />);
      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
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

    it('should use customSemiBold16 variant for medium size', () => {
      render(<CopyLink value="test" size="medium" />);
      const element = screen.getByText('test').parentElement;
      expect(element).toHaveClass('MuiTypography-customSemiBold16');
    });

    it('should use customSemiBold20 variant for large size', () => {
      render(<CopyLink value="test" size="large" />);
      const element = screen.getByText('test').parentElement;
      expect(element).toHaveClass('MuiTypography-customSemiBold20');
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
      expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
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

    it('should handle unknown hrefType gracefully', () => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: true });
      render(<CopyLink value="test" hrefType="unknown" />);
      const link = screen.getByText('test').closest('a');
      expect(link).toHaveAttribute('href', '');
    });
  });
});
