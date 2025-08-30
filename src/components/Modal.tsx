// src/components/Modal.tsx
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  padding: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: #ccc;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <Overlay>
      <ModalBox>
        {/* <CloseButton onClick={onClose}>X</CloseButton> */}
        {children}
      </ModalBox>
    </Overlay>
  );
};

export default Modal;
