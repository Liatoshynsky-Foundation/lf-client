'use client';
import { Box, Popover, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';

import { Chip } from '~/ds-components/chip/Chip';

import { styles } from './DropdownFilterPopper.style';

export function useFilterPopper<T extends HTMLElement = HTMLDivElement>() {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);
  const triggerRef = useRef<T | null>(null);
  const isMountedRef = useRef(true);
  const open = Boolean(anchorEl);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const toggle = useCallback(() => {
    setAnchorEl((prev) => (prev ? null : triggerRef.current));
  }, []);

  const close = useCallback(() => setAnchorEl(null), []);

  const closeAndRestoreFocus = useCallback(() => {
    setAnchorEl(null);
    requestAnimationFrame(() => {
      if (isMountedRef.current && triggerRef.current) {
        triggerRef.current.focus();
      }
    });
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
  const { anchorEl, open, triggerRef, toggle, close, closeAndRestoreFocus } = useFilterPopper<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      autoFocusRef.current?.focus();
    });
  }, [open, autoFocusRef]);

  const handleClearChipKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onClearChip?.();
    }
  };

  return (
    <>
      <Box
        ref={triggerRef}
        onClick={disabled ? undefined : toggle}
        sx={styles.root(variant, disabled)}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <Typography sx={styles.label(disabled)}>{label}</Typography>
        <Box sx={styles.chipContainer}>
          {chipCount > 0 && onClearChip && (
            <Chip
              label={`${chipCount} ${t('selected')}`}
              disabled={disabled}
              onDelete={onClearChip}
              size="small"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleClearChipKeyDown}
            />
          )}
          <Box sx={styles.dropdownIcon(disabled, open)}>
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
      >
        <Box
          ref={contentRef}
          role="dialog"
          aria-modal={true}
          aria-label={label}
          sx={styles.popoverContent(triggerRef.current?.offsetWidth)}
        >
          {children({ close, closeAndRestoreFocus })}
        </Box>
      </Popover>
    </>
  );
};
