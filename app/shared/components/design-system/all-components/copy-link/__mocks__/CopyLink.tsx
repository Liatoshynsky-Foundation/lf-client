import React from 'react';

export const mockState = { isMobile: false };

export const setMockIsMobile = (value: boolean) => {
  mockState.isMobile = value;
};

interface MockedCopyLinkProps {
  value: string | number;
  hrefType?: 'phone' | 'email';
  disabled?: boolean;
}

const CopyLink = ({ value, hrefType, disabled }: MockedCopyLinkProps) => {
  const handleClick = () => {
    if (!disabled && !mockState.isMobile) {
      navigator.clipboard.writeText(String(value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  if (mockState.isMobile && hrefType) {
    const href = hrefType === 'phone' ? `tel:${value}` : `mailto:${value}`;
    return (
      <a href={href} data-testid="mock-copy-link">
        {value}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid="mock-copy-link"
    >
      <span>{value}</span>
    </button>
  );
};

export default CopyLink;
