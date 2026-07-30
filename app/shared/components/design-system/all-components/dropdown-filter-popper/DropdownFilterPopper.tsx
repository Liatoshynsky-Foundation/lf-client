'use client';
import { Box, Button, Popover, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useId, useImperativeHandle, useRef, useState } from 'react';

import { Chip } from '~/ds-components/chip/Chip';

import { styles } from './DropdownFilterPopper.style';

export function useFilterPopper<T extends HTMLElement = HTMLDivElement>() {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);
  const triggerRef = useRef<T | null>(null);
  const open = Boolean(anchorEl);

  const toggle = useCallback(() => {
    setAnchorEl((prev) => (prev ? null : triggerRef.current));
  }, []);

  const close = useCallback(() => setAnchorEl(null), []);

  const closeAndRestoreFocus = useCallback(() => {
    setAnchorEl(null);
    const raf = requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return { anchorEl, open, triggerRef, toggle, close, closeAndRestoreFocus };
}

export interface DropdownFilterPopperHandle {
  focusTrigger: () => void;
}

interface DropdownFilterPopperProps {
  label: string;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
  chipCount?: number;
  onClearChip?: () => void;
  autoFocusRef: React.RefObject<HTMLElement | null>;
  popperRef?: React.RefObject<DropdownFilterPopperHandle | null>;
  children: (args: { close: () => void; closeAndRestoreFocus: () => void }) => React.ReactNode;
}

export const DropdownFilterPopper = ({
  label,
  disabled = false,
  variant = 'filled',
  chipCount = 0,
  onClearChip,
  autoFocusRef,
  popperRef,
  children
}: DropdownFilterPopperProps) => {
  const t = useTranslations('filtering');
  const { anchorEl, open, triggerRef, toggle, close, closeAndRestoreFocus } = useFilterPopper<HTMLButtonElement>();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useId();

  useImperativeHandle(
    popperRef,
    () => ({
      focusTrigger: () => {
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }),
    [triggerRef]
  );

  return (
    <>
      <Box ref={rootRef} sx={styles.root(variant, disabled)}>
        <Button
          ref={triggerRef}
          disabled={disabled}
          onClick={disabled ? undefined : toggle}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? popoverId : undefined}
          aria-label={label}
          style={styles.overlayButton}
        />

        <Typography sx={styles.label(disabled)} style={styles.nonInteractive}>
          {label}
        </Typography>

        <Box sx={styles.chipContainer}>
          {chipCount > 0 && onClearChip && (
            <Chip
              label={`${chipCount} ${t('selected')}`}
              disabled={disabled}
              onDelete={onClearChip}
              size="small"
              tabIndex={-1}
            />
          )}
          <Box sx={styles.dropdownIcon(disabled, open)} style={styles.nonInteractive}>
            <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
          </Box>
        </Box>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        disableScrollLock
        onClose={closeAndRestoreFocus}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          transition: {
            onEntered: () => {
              autoFocusRef.current?.focus();
            }
          }
        }}
      >
        <Box
          role="dialog"
          aria-modal={true}
          aria-label={label}
          sx={styles.popoverContent(rootRef.current?.offsetWidth)}
        >
          {children({ close, closeAndRestoreFocus })}
        </Box>
      </Popover>
    </>
  );
};
