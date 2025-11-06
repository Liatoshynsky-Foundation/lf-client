'use client';

import { useTranslations } from 'next-intl';
import { type RefObject, useEffect, useState } from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import TooltipCustom from '~/ds-components/tooltip/Tooltip';

import { styles } from './CopyButton.styles';

import { useIsMounted } from '~/shared/hooks/is-mounted/useIsMounted';

type CopyButtonPropsType<T extends HTMLElement = HTMLElement> = {
  targetRef: RefObject<T | null>;
  delay?: number;
  hint?: string;
  iconSize?: 'small' | 'medium' | 'large';
};

const iconSizes = {
  small: 16,
  medium: 20,
  large: 24
};

export const CopyButton = <T extends HTMLElement = HTMLElement>({
  targetRef,
  hint,
  delay = 3000,
  iconSize = 'medium'
}: CopyButtonPropsType<T>) => {
  const [isCopied, setIsCopied] = useState(false);
  const isMounted = useIsMounted();

  const t = useTranslations('common');
  const finalHint = hint || t('copied');

  const handleCopy = async () => {
    if (!targetRef.current?.textContent) return;

    try {
      await navigator.clipboard.writeText(targetRef.current.textContent);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  const button = (
    <IconButton customStyles={styles.iconButton} onClick={handleCopy} aria-label="Copy content">
      <SvgImage
        src="/icons/content-copy.svg"
        alt="content copy"
        width={iconSizes[iconSize]}
        height={iconSizes[iconSize]}
      />
    </IconButton>
  );

  useEffect(() => {
    if (!isCopied) return;

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [isCopied, delay]);

  if (!isMounted) return button;

  return (
    <TooltipCustom title={finalHint} isOpen={isCopied} showArrow>
      {button}
    </TooltipCustom>
  );
};
