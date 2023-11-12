import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useModal } from '@utils/zustand/useModal';

import Close from '@constants/icon/close.svg';

const customStyles = (width: string) => {
  return {
    content: {
      width: `${width}`,
      bottom: 'auto',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '30px',
      padding: '35px',
      overflow: 'hidden',
    },
    overlay: {
      zIndex: 100,
      backgroundColor: 'rgba(26, 26, 26, 0.5)',
    },
  };
};

export const CustomModal = () => {
  const { open, change, changeChildren, children, width, height, close, edit, setOpen, setClose } = useModal();

  useEffect(() => {
    if (change) {
      setTimeout(() => {
        setClose();
        if (changeChildren.props.id !== 'end') setOpen(changeChildren);
        useModal.setState(() => ({ change: false }));
      }, 1500);
    }
  }, [change]);

  const onloaclSetClose = () => {
    setClose();
    if (change) {
      if (changeChildren.props.id !== 'end') setOpen(changeChildren);
      useModal.setState(() => ({ change: false }));
    }
  };

  return (
    <Modal isOpen={open} onRequestClose={onloaclSetClose} style={customStyles(width)}>
      <div className={`relative bg-gray-10 overflow-auto ${height && 'h-[80vh]'}`}>
        {children}
        <div className="absolute top-0 right-0 flex gap-[18px]">
          {edit && <img className="cursor-pointer" alt="eidt" src={edit.icon} onClick={edit.onClick} />}
          {close && <img className="cursor-pointer" alt="close" src={Close} onClick={onloaclSetClose} />}
        </div>
      </div>
    </Modal>
  );
};
