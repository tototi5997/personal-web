import c from "classnames";
import s from "./index.module.less";

const DemoModal = () => {
  return (
    <div className={c(s.demo_modal)}>
      <h1>DemoModal Title</h1>
      <p>DemoModal Content</p>
    </div>
  );
};

export default DemoModal;
