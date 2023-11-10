import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useModal } from '@utils/zustand/useModal';

import Close from '@constants/icon/close.svg';

const customStyles = {
  content: {
    width: '800px',
    bottom: 'auto',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
  },
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(26, 26, 26, 0.5)',
  },
};

const changeCustomStyles = {
  content: {
    width: '360px',
    bottom: 'auto',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
  },
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(26, 26, 26, 0.5)',
  },
};

export const CustomModal = () => {
  const { open, change, changeChildren, children, setOpen, setClose } = useModal();

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
    <Modal isOpen={open} onRequestClose={onloaclSetClose} style={!change ? customStyles : changeCustomStyles}>
      <div
        className={`relative bg-gray-10 py-[45px] px-[55px] overflow-auto scrollbar-thin scrollbar-thumb-gray-30 scrollbar-track-gray-10 ${
          !change && 'h-[80vh]'
        }`}
      >
        {children}
        {!change && (
          <div className="absolute top-[54px] right-[45px] cursor-pointer">
            <img alt="close" src={Close} onClick={onloaclSetClose} />
          </div>
        )}
      </div>
    </Modal>
  );
};
