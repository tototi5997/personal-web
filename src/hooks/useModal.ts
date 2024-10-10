import { ModalContext } from "@/modals/ModalRoot";
import { useContext } from "react";

const useModal = () => useContext(ModalContext);

export default useModal;
