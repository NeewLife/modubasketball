import React from 'react';
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
  },
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(26, 26, 26, 0.5)',
  },
};

export const CustomModal = () => {
  const { open, children, setClose } = useModal();

  return (
    <Modal isOpen={open} onRequestClose={setClose} style={customStyles}>
      <div className="relative rounded-[30px] bg-gray-10 py-[45px] px-[55px] h-[800px] overflow-auto scrollbar-thin scrollbar-thumb-gray-30 scrollbar-track-gray-10">
        {children}
        <div className="absolute top-[54px] right-[45px] cursor-pointer">
          <img alt="close" src={Close} onClick={setClose} />
        </div>
      </div>
    </Modal>
  );
};
