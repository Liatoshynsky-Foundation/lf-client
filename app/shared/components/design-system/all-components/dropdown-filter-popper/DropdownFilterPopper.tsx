'use client';
import { Box, Popover, Typography } from '@mui/material';
import Image from 'next/image';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { filterSelectStyles } from './DropdownFilterPopper.style';

export function useFilterPopper<T extends HTMLElement = HTMLButtonElement>() {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);
  const triggerRef = useRef<T | null>(null);
  const open = Boolean(anchorEl);
  const toggle = useCallback(() => {
    setAnchorEl((prev) => (prev ? null : triggerRef.current));
  }, []);
  const close = useCallback(() => setAnchorEl(null), []);
  const closeAndRestoreFocus = useCallback(() => {
    setAnchorEl(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
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
  role?: 'menu' | 'dialog';
  chip?: React.ReactNode;
  autoFocusRef?: React.RefObject<HTMLElement | null>;
  children: (args: { close: () => void; closeAndRestoreFocus: () => void }) => React.ReactNode;
}

const FOCUSABLE_SELECTOR =
  '[role="option"]:not([aria-disabled="true"]), input:not([disabled]), button:not([disabled]), [href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const DropdownFilterPopper = forwardRef<DropdownFilterPopperHandle, DropdownFilterPopperProps>(
  function DropdownFilterPopper(
    { label, disabled = false, variant = 'filled', role = 'menu', chip, autoFocusRef, children },
    forwardedRef
  ) {
    const { anchorEl, open, triggerRef, toggle, close, closeAndRestoreFocus } = useFilterPopper<HTMLDivElement>();
    const contentRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(forwardedRef, () => ({
      focusTrigger: () => {
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }));

    useEffect(() => {
      if (!open) return;
      requestAnimationFrame(() => {
        if (autoFocusRef?.current) {
          autoFocusRef.current.focus();
          return;
        }
        const first = contentRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        first?.focus();
      });
    }, [open, autoFocusRef]);

    return (
      <>
        <Box
          ref={triggerRef}
          component="div"
          onClick={disabled ? undefined : toggle}
          sx={{
            ...filterSelectStyles.root(variant, disabled),
            cursor: disabled ? 'default' : 'pointer',
            outline: 0
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup={role}
          aria-expanded={open}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              toggle();
            }
          }}
        >
          <Typography sx={filterSelectStyles.label(disabled)}>{label}</Typography>
          <Box sx={filterSelectStyles.chipContainer}>
            {chip}
            <Box sx={filterSelectStyles.dropdownIcon(disabled)}>
              <Image src="/icons/chevron-down.svg" alt="" width={16} height={16} />
            </Box>
          </Box>
        </Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          disableScrollLock
          onClose={(_event, reason) => {
            if (reason === 'escapeKeyDown') {
              closeAndRestoreFocus();
            } else {
              close();
            }
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Box
            ref={contentRef}
            role={role}
            aria-modal={role === 'dialog' ? true : undefined}
            aria-label={label}
            sx={{ minWidth: triggerRef.current?.offsetWidth, outline: 0 }}
          >
            {children({ close, closeAndRestoreFocus })}
          </Box>
        </Popover>
      </>
    );
  }
);
