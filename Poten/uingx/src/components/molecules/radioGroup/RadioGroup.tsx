import React from 'react';

import Fill from '@constants/icon/radio-fill.svg';

export const RadioGroup = () => {
  return (
    <div className="flex" tabIndex={0} role="button">
      <img alt="fill" src={Fill} />
    </div>
  );
};
