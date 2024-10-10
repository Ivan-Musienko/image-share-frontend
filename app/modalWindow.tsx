"use client";
import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { useModalContext } from "@/contexts/modalContext";
export default function ModalWindow() {
  const { modal } = useModalContext();
  const { onClose, onOpen, isOpen } = useDisclosure();

  useEffect(() => {
    if (!modal) {
      onClose();
    } else {
      onOpen();
    }
  }, [modal]);

  return (
    <>
      <Modal isOpen={isOpen} size={modal?.modalSize} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{modal?.modalHeader}</ModalHeader>
          <ModalBody>{modal?.modalBody}</ModalBody>
          <ModalFooter>{modal?.modalFooter}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
