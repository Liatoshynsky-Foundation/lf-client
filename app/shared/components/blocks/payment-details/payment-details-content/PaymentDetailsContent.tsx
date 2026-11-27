import { Box, Typography } from '@mui/material';
import type { JSONContent } from '@tiptap/react';
import React from 'react';

import CopyLink from '~/ds-components/copy-link/CopyLink';

import { styles } from './PaymentDetailsContent.styles';

import { extractTextFromTipTap } from '~/lib/utils/tiptapHelpers';

type PaymentDetailsContentProps = Readonly<{
  content: JSONContent;
}>;

const SAFE_LINK_PATTERN = /^(https?:|mailto:|tel:)/i;

const renderMarks = (text: string, marks: JSONContent['marks'] = []): React.ReactNode =>
  marks.reduce<React.ReactNode>((children, mark) => {
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>;
      case 'italic':
        return <em>{children}</em>;
      case 'underline':
        return <u>{children}</u>;
      case 'link': {
        const href = typeof mark.attrs?.href === 'string' ? mark.attrs.href : '';

        return SAFE_LINK_PATTERN.test(href) ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          children
        );
      }
      default:
        return children;
    }
  }, text);

const renderChildren = (node: JSONContent): React.ReactNode =>
  node.content?.map((child, index) => <React.Fragment key={index}>{renderNode(child)}</React.Fragment>);

const renderNode = (node: JSONContent): React.ReactNode => {
  switch (node.type) {
    case 'doc':
      return renderChildren(node);
    case 'text':
      return renderMarks(node.text ?? '', node.marks);
    case 'hardBreak':
      return <br />;
    case 'paragraph':
      return (
        <Typography component="p" variant="customSemiBold20" sx={styles.paragraph}>
          {renderChildren(node)}
        </Typography>
      );
    case 'table':
      return (
        <Box component="table" sx={styles.table}>
          <tbody>{renderChildren(node)}</tbody>
        </Box>
      );
    case 'tableRow':
      return (
        <Box component="tr" sx={styles.row}>
          {renderChildren(node)}
        </Box>
      );
    case 'tableHeader':
      return (
        <Box component="th" scope="row" sx={styles.label}>
          {renderChildren(node)}
        </Box>
      );
    case 'tableCell': {
      const value = extractTextFromTipTap(node).trim();

      return (
        <Box component="td" sx={styles.value}>
          {value ? (
            <CopyLink value={value} size="large" forceShowCopyIcon sx={styles.copyLink} iconSx={styles.copyIcon} />
          ) : null}
        </Box>
      );
    }
    default:
      return renderChildren(node);
  }
};

function PaymentDetailsContent({ content }: PaymentDetailsContentProps) {
  return (
    <Box sx={styles.content} data-testid="PaymentDetailsContent">
      {renderNode(content)}
    </Box>
  );
}

export default PaymentDetailsContent;
