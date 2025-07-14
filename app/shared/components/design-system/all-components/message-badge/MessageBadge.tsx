import { Badge } from '@mui/material';
import Image from 'next/image';

import { badgeStyles, iconSizes } from './MessageBadge.styles';

type DotVariantProps = {
  variant: 'dot';
  color?: 'primary' | 'error';
};

type StandardVariantProps = {
  variant?: 'standard';
  color?: 'default' | 'primary' | 'secondary' | 'error';
};

type MessageBadgeProps = (DotVariantProps | StandardVariantProps) & {
  content?: number;
  onClick?: () => void;
};

const MessageBadge: React.FC<MessageBadgeProps> = ({ content, onClick, color = 'default', variant = 'standard' }) => {
  return (
    <Badge variant={variant} badgeContent={content} color={color} sx={{ ...badgeStyles, cursor: onClick && 'pointer' }}>
      <Image src="/images/message-icon.svg" alt="message badge logo" {...iconSizes} />
    </Badge>
  );
};

export default MessageBadge;
