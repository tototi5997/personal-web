import { useEffect, useRef, useState } from "react";
import { IModalRoot } from "@/modals/ModalRoot";
import GlobalModal from "@/modals";

// modalRef: MutableRefObject<IModalRoot | undefined>
const useInitModal = () => {
  const modalRef = useRef<IModalRoot>();
  const [globalModal, setGlobalModal] = useState<GlobalModal>();

  useEffect(() => {
    if (modalRef.current) {
      const modalInstance = new GlobalModal(modalRef);
      setGlobalModal(modalInstance);
    }
  }, [modalRef]);

  return { modalRef, globalModal };
};

export default useInitModal;
