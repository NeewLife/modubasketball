import React, { useEffect, useState } from 'react';
import { CustomAlert, CustomAlertProps } from '@components/atoms';

interface CustomAlertActionProps {
  hold?: number;
  open?: boolean;
  onTrackable?: (open: boolean) => void;
}

export const CustomAlertAction = (props: CustomAlertActionProps & CustomAlertProps) => {
  const { hold = 2000, open = false, onTrackable = () => {}, ...prop } = props;

  const [localOpen, setLocalOpen] = useState(open);

  useEffect(() => {
    setLocalOpen(open);
    if (open) {
      setTimeout(() => {
        setLocalOpen(false);
        onTrackable(false);
      }, hold);
    }
  }, [open]);

  return <CustomAlert className={localOpen ? '' : 'hidden'} {...prop} />;
};
