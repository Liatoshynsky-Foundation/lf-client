import React from 'react';
import Button from '~/shared/components/design-system/all-components/button/Button';
import Link from 'next/link';

type SupportButtonData = {
  text: string;
  link: string;
};

type SupportButtonProps = {
  data: SupportButtonData;
};

const SupportButton: React.FC<SupportButtonProps> = ({ data }) => {
  return (
    <Link href={data.link} passHref>
      <Button size="medium" variant="filled" color="tertiary" label={data.text} />
    </Link>
  );
};

export default SupportButton;
