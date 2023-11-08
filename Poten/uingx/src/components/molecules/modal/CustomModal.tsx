import React from 'react';
import Modal from 'react-modal';
import { useModal } from '@utils/zustand/useModal';

const customStyles = {
  content: {
    width: '800px',
    top: '180px',
    bottom: 'auto',
    left: '50%',
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
      <div className="rounded-[30px] bg-gray-10 py-[45px] px-[55px]">{children}</div>
    </Modal>
  );
};
