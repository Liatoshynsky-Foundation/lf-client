import React from 'react';

import Button from '~/ds-components/button/Button';

import type { SupportButtonData } from '~/types/types/header.type';

type SupportButtonProps = {
  data: SupportButtonData;
};

const SupportButton: React.FC<SupportButtonProps> = ({ data }) => {
  return <Button size="medium" variant="contained" color="tertiary" link={data.link} label={data.text} />;
};

export default SupportButton;
