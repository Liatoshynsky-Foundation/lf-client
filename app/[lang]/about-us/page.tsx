import React, { ReactElement } from 'react';

import Play from '~/public/icons/play.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

export default function AboutUs(): ReactElement {
  return (
    <div style={{ padding: '100px', backgroundColor: '#f0f0f0' }}>
      AboutUs
      <Svg Component={Play} alt="Description of the icon" color="#dbdafa" fill="#FF00ff" width="48px" height="48px" />
    </div>
  );
}
