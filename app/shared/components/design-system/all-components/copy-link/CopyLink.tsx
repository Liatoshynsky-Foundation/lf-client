import { Box, Link, SxProps, Theme, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import TooltipCustom from '~/ds-components/tooltip/Tooltip';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { getCopyLinkStyles, getIconStroke, getMobileDisabledStyles, styles } from './CopyLink.styles';
import { iconSizes } from '~/constants/design';
import { sxToArray } from '~/utils/sxToArray';

import CopyIcon from '~/public/icons/copy-icon.svg';

interface CopyLinkProps {
  hrefType?: string;
  value: string | number;
  size?: 'medium' | 'large';
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  hint?: string;
  delay?: number;
  sx?: SxProps<Theme>;
}

function CopyLink({
  value,
  size = 'medium',
  type = 'primary',
  hint,
  delay = 3000,
  hrefType,
  disabled = false,
  sx
}: CopyLinkProps) {
  const { isMobile } = useBreakpoints();
  const [isCopied, setIsCopied] = useState(false);

  const t = useTranslations('common');
  const finalHint = hint || t('copied');

  const handleCopy = async () => {
    if (isMobile || disabled) return;

    try {
      await navigator.clipboard.writeText(String(value));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), delay);
    } catch {
      setIsCopied(false);
    }
  };

  const variant = size === 'medium' ? 'customSemiBold16' : 'customSemiBold20';
  const iconSize = iconSizes[size];
  const copyLinkStyles = getCopyLinkStyles(type);

  if (isMobile) {
    const href = hrefType === 'phone' ? `tel:${value}` : hrefType === 'email' ? `mailto:${value}` : '';
    return (
      <Link
        variant={variant}
        href={href}
        sx={{
          ...copyLinkStyles,
          ...sxToArray(sx),
          ...(disabled && getMobileDisabledStyles())
        }}
      >
        {value}
      </Link>
    );
  }

  return (
    <Typography
      component="div"
      variant={variant}
      onClick={handleCopy}
      aria-disabled={disabled}
      sx={{
        ...styles.wrapper,
        ...copyLinkStyles,
        ...sxToArray(sx)
      }}
    >
      <Typography component="span" variant={variant}>
        {value}
      </Typography>
      <TooltipCustom title={isCopied ? finalHint : ''} showArrow open={isCopied}>
        <Box sx={styles.iconWrapper}>
          <Svg
            width={`${iconSize}px`}
            height={`${iconSize}px`}
            Component={CopyIcon}
            alt="Copy"
            stroke={getIconStroke(type, disabled)}
          />
        </Box>
      </TooltipCustom>
    </Typography>
  );
}

export default CopyLink;
