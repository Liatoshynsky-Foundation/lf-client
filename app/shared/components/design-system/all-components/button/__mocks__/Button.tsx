import React from 'react';

type MockedButtonProps = {
  label?: string;
  shortLabel?: string;
  link?: string;
  children?: React.ReactNode;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ label, shortLabel, link, startIcon, endIcon, children, onClick }: MockedButtonProps) => {
  label = shortLabel ?? label;

  const innards = (
    <button onClick={onClick}>
      {startIcon && <span className="start-icon">{startIcon}</span>}
      {label ?? children}
      {endIcon && <span className="end-icon">{endIcon}</span>}
    </button>
  );

  return link ? <a href={link}>{innards}</a> : innards;
};

export default Button;
