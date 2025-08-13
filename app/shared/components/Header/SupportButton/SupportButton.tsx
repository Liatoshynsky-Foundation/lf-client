import React from 'react';

import type { SupportButtonData } from '~/types/types/header.type';

import { Link } from '~/i18n/navigation';
import Button from '~/shared/components/design-system/all-components/button/Button';

type SupportButtonProps = {
  data: SupportButtonData;
};

const SupportButton: React.FC<SupportButtonProps> = ({ data }) => {
  return (
    <Link href={data.link}>
      <Button size="medium" variant="contained" color="tertiary" label={data.text}></Button>
    </Link>
  );
};

export default SupportButton;
