import { ModalProps } from "antd";
import DemoModal from "./contents/DemoModal";

interface IModalMain {
  des?: string;
  component: (props: any) => JSX.Element | null;
  extraProps?: Record<string, unknown>;
  noPadding?: boolean;
}

export type GlobalMoalType = IModalMain & ModalProps;

export type ModalKey = "demo_modal";

const modalMap = new Map<ModalKey, GlobalMoalType>([
  [
    "demo_modal",
    {
      des: "show wallet list to change wallet",
      component: DemoModal,
      footer: null,
      noPadding: true,
      closable: false,
      width: 460,
    },
  ],
]);

export default modalMap;
