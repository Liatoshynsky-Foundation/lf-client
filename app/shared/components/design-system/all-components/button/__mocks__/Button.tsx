import React from 'react';

type MockedButtonProps = {
  label?: string;
  shortLabel?: string;
  link?: string;
  externalLink?: boolean;
  children?: React.ReactNode;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  label,
  shortLabel,
  link,
  externalLink,
  startIcon,
  endIcon,
  children,
  onClick
}: MockedButtonProps) => {
  label = shortLabel ?? label;

  const innards = (
    <button onClick={onClick}>
      {startIcon && <span className="start-icon">{startIcon}</span>}
      {label ?? children}
      {endIcon && <span className="end-icon">{endIcon}</span>}
    </button>
  );

  if (!link) return innards;

  if (externalLink) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {innards}
      </a>
    );
  }

  return <a href={link}>{innards}</a>;
};

export default Button;
