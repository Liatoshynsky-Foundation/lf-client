import { Box, SxProps, Theme } from '@mui/material';
import { KeyboardEvent, ReactNode } from 'react';

import { heroSectionStyles } from '../../HeroSection.styles';
import { CursorButton } from '../CursorButton/CursorButton';
import { useButtonCursor } from '../useButtonCursor';

import { sxToArray } from '~/lib/utils/sxToArray';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type BoxButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  cursorContent?: {
    text: string;
    iconSrc: string;
  };
  customSX?: SxProps<Theme>;
  testID?: string;
};

export const BoxButton = ({ onClick, children, cursorContent, customSX, testID = 'box-button' }: BoxButtonProps) => {
  const { cursorConfig, eventHandlers, ref } = useButtonCursor();
  const bp = useBreakpoints();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const interactionProps = {
    onClick,
    ...(!bp.isMobile && {
      onKeyDown: handleKeyDown,
      ...eventHandlers,
      role: 'button',
      tabIndex: 0
    })
  };

  return (
    <>
      <Box ref={ref} {...interactionProps} data-testid={testID} sx={[...sxToArray(customSX)]}>
        {children}
      </Box>

      {!bp.isMobile && (
        <CursorButton
          testID={`${testID}-cursor`}
          textConfig={{
            content: cursorContent?.text || '',
            sx: heroSectionStyles.cursorButtonText
          }}
          iconConfig={cursorContent ? { src: cursorContent.iconSrc, width: 16, height: 16 } : undefined}
          {...cursorConfig}
          customSX={heroSectionStyles.cursorButton}
        />
      )}
    </>
  );
};
