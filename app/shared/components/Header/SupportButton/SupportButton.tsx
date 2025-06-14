import { Typography } from '@mui/material';
import React from 'react';

import { Link } from '~/i18n/navigation';
import Button from '~/shared/components/design-system/all-components/button/Button';

type SupportButtonData = {
  text: string;
  link: string;
};

type SupportButtonProps = {
  data: SupportButtonData;
};

const SupportButton: React.FC<SupportButtonProps> = ({ data }) => {
  return (
    <Link href={data.link}>
      <Button
        size="medium"
        variant="contained"
        color="tertiary"
        label={<Typography variant="customButtonMedium">{data.text}</Typography>}
      ></Button>
    </Link>
  );
};

export default SupportButton;
