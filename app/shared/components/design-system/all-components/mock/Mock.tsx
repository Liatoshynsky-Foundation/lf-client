/* eslint-disable prettier/prettier */
import Typography from '@mui/material/Typography';
import React from 'react';

import Button from '~/ds-components/button/Button';

// import Button from '../button/Button';

const Mock = () => {
  return (
    <div style={{ display: 'grid', gap: 20, maxWidth: 400 }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        label={<Typography variant="customButtonSmall">contained</Typography>}
      />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        label={<Typography variant="customButtonMedium">contained </Typography>}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        label={<Typography variant="customButtonLarge">contained</Typography>}
      />
      <div style={{ display: 'grid', gap: 20, maxWidth: 400, backgroundColor: 'black' }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          label={<Typography variant="customButtonSmall">contained</Typography>}
        />
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          label={<Typography variant="customButtonMedium">contained </Typography>}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          label={<Typography variant="customButtonLarge">contained</Typography>}
        />
      </div>
      <Button
        variant="contained"
        color="tertiary"
        size="small"
        label={<Typography variant="customButtonSmall">contained </Typography>}
      />
      <Button
        variant="contained"
        color="tertiary"
        size="medium"
        label={<Typography variant="customButtonMedium">contained </Typography>}
      />
      <Button
        variant="contained"
        color="tertiary"
        size="large"
        label={<Typography variant="customButtonLarge">contained </Typography>}
      />

      <Button
        variant="outlined"
        color="primary"
        size="small"
        label={<Typography variant="customButtonSmall">outlined </Typography>}
      />
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        label={<Typography variant="customButtonMedium">outlined</Typography>}
      />
      <Button
        variant="outlined"
        color="primary"
        size="large"
        label={<Typography variant="customButtonLarge">outlined </Typography>}
      />
      <div style={{ display: 'grid', gap: 20, maxWidth: 400, backgroundColor: 'black' }}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          label={<Typography variant="customButtonSmall">outlined</Typography>}
        />
        <Button
          variant="outlined"
          color="secondary"
          size="medium"
          label={<Typography variant="customButtonMedium">outlined </Typography>}
        />
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          label={<Typography variant="customButtonLarge">outlined </Typography>}
        />
      </div>
      <Button
        variant="text"
        color="primary"
        size="small"
        label={<Typography variant="customButtonSmall">text </Typography>}
      />
      <Button
        variant="text"
        color="primary"
        size="medium"
        label={<Typography variant="customButtonMedium">text</Typography>}
      />
      <Button
        variant="text"
        color="primary"
        size="large"
        label={<Typography variant="customButtonLarge">text </Typography>}
      />
      <div style={{ display: 'grid', gap: 20, maxWidth: 400, backgroundColor: 'black' }}>
        <Button
          variant="text"
          color="secondary"
          size="small"
          label={<Typography variant="customButtonSmall">text </Typography>}
        />
        <Button
          variant="text"
          color="secondary"
          size="medium"
          label={<Typography variant="customButtonMedium">text </Typography>}
        />
        <Button
          variant="text"
          color="secondary"
          size="large"
          label={<Typography variant="customButtonLarge">text </Typography>}
        />
      </div>
    </div>
  );
};
export default Mock;
