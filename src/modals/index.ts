import { MutableRefObject } from "react";
import { IModalRoot } from "./ModalRoot";
import { ModalKey } from "./Modals.map";
import { ModalProps } from "antd";

type ModalCloseCallback = (callbackParams: any) => void;

class GlobalModal {
  private modalRef: MutableRefObject<IModalRoot | undefined>;
  private onCloseCallbacks: ModalCloseCallback[] = [];

  constructor(modalRef: MutableRefObject<IModalRoot | undefined>) {
    this.modalRef = modalRef;
  }

  public show<T>(key: ModalKey, extra?: T, extraModalProps?: ModalProps) {
    this.modalRef.current?.show(key, extra, extraModalProps);
    return this;
  }

  public hide<T>(effectPrams?: T) {
    this.modalRef.current?.hide();

    // if onClose Callbacks exit
    // hide event must be triggered by useModal hook
    const len = this.onCloseCallbacks.length;
    if (len) {
      for (let i = 0; i <= len; i++) {
        const callback = this.onCloseCallbacks.shift();
        callback?.(effectPrams);
      }
    }

    return this;
  }

  public onClose(callback: ModalCloseCallback) {
    this.onCloseCallbacks.push(callback);
    return this;
  }
}

export default GlobalModal;

// modal.show(key).onClose(() => {})
