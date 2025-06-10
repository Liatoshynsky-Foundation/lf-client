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
      <Button size="medium" variant="filled" color="tertiary" label={data.text} />
    </Link>
  );
};

export default SupportButton;
