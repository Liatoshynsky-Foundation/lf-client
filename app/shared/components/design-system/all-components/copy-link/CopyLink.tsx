'use client';

import { Box, Link, SxProps, Theme, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import TooltipCustom from '~/ds-components/tooltip/Tooltip';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { getCopyLinkStyles, getIconStroke, getMobileDisabledStyles, styles } from './CopyLink.styles';
import { iconSizes } from '~/constants/design';
import { sxToArray } from '~/utils/sxToArray';

import CopyIcon from '~/public/icons/content-copy.svg';
export type CopyIconSize = keyof typeof iconSizes;

interface CopyLinkProps {
  hrefType?: 'phone' | 'email';
  value: string | number;
  size?: CopyIconSize;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  hint?: string;
  delay?: number;
  sx?: SxProps<Theme>;
  textSx?: SxProps<Theme>;
  forceShowCopyIcon?: boolean;
}

function CopyLink({
  value,
  forceShowCopyIcon = false,
  size = 'medium',
  type = 'primary',
  hint,
  delay = 3000,
  hrefType,
  disabled = false,
  sx,
  textSx
}: Readonly<CopyLinkProps>) {
  const { isMobile } = useBreakpoints();
  const [isCopied, setIsCopied] = useState(false);

  const t = useTranslations('common');
  const finalHint = hint || t('copied');

  const handleCopy = async () => {
    if ((isMobile && !forceShowCopyIcon) || disabled) return;

    try {
      await navigator.clipboard.writeText(String(value));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), delay);
    } catch {
      setIsCopied(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCopy();
    }
  };
  const variant = size === 'small' || size === 'medium' ? 'customSemiBold16' : 'customSemiBold20';
  const copyIconSize = iconSizes[size];
  const copyLinkStyles = getCopyLinkStyles(type);

  if (isMobile && !forceShowCopyIcon) {
    let href = '';
    if (hrefType === 'phone') {
      href = `tel:${value}`;
    } else if (hrefType === 'email') {
      href = `mailto:${value}`;
    }

    if (!href) {
      return (
        <Typography
          variant={variant}
          data-testid="CopyLink--mobile"
          sx={[
            copyLinkStyles,
            ...sxToArray(sx),
            ...sxToArray(textSx),
            ...(disabled ? [getMobileDisabledStyles()] : [])
          ]}
        >
          {value}
        </Typography>
      );
    }

    return (
      <Link
        variant={variant}
        href={href}
        data-testid="CopyLink--mobile"
        sx={[copyLinkStyles, ...sxToArray(sx), ...sxToArray(textSx), ...(disabled ? [getMobileDisabledStyles()] : [])]}
      >
        {value}
      </Link>
    );
  }

  return (
    <Box
      component="button"
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      data-testid="CopyLink"
      sx={[styles.wrapper, copyLinkStyles, ...sxToArray(sx)]}
    >
      <Typography component="span" variant={variant} data-testid="CopyLink-text" sx={sxToArray(textSx)}>
        {value}
      </Typography>
      <TooltipCustom title={finalHint} isOpen={isCopied} showArrow>
        <Box sx={styles.iconWrapper} data-testid="CopyLink-iconWrapper">
          <Svg
            width={`${copyIconSize}px`}
            height={`${copyIconSize}px`}
            Component={CopyIcon}
            alt="Copy"
            stroke={getIconStroke(type, disabled)}
            data-testid="CopyLink-icon"
          />
        </Box>
      </TooltipCustom>
    </Box>
  );
}

export default CopyLink;
