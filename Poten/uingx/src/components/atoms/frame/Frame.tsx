import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

export const Frame = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { children, className, ...prop } = props;

  return (
    <div className={`inline-flex items-center justify-center rounded-[5px] ${className}`} {...prop}>
      {children}
    </div>
  );
};
