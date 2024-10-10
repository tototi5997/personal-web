import React, { useImperativeHandle, useState } from "react";
import modalMap, { GlobalMoalType, ModalKey } from "./Modals.map";
import GlobalModal from "./index";
import { Modal, ModalProps } from "antd";
import c from "classnames";
import s from "./modal.module.less";

export interface IModalRoot {
  show: <T>(key: string, extra?: T, extraModalProps?: ModalProps) => void;
  hide: () => void;
}

const ModalRoot = React.forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);

  const [modalProps, setModalProps] = useState<GlobalMoalType>();

  useImperativeHandle(ref, () => ({
    show: (key: ModalKey, extra?: Record<string, unknown>, extraModalProps?: ModalProps) => {
      // find modal props by key, then set modal props
      const modalProps = modalMap.get(key);
      if (modalProps) {
        setModalProps({ ...modalProps, extraProps: { ...modalProps?.extraProps, ...extra }, ...extraModalProps });
        setVisible(true);
      }
    },
    hide: () => {
      setVisible(false);
    },
  }));

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      wrapClassName={c({
        [s.no_padding]: modalProps?.noPadding,
      })}
      destroyOnClose
      {...modalProps}
      centered
    >
      {modalProps?.component ? React.createElement(modalProps.component, modalProps?.extraProps) : null}
    </Modal>
  );
});

export default ModalRoot;
export const ModalContext = React.createContext<GlobalModal | undefined>(undefined);
