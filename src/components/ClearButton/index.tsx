import c from "classnames";
import s from "./index.module.less";

interface IClearButton {
  className?: string;
  onClick?: () => void;
  state?: boolean;
}

const ClearButton: React.FC<IClearButton> = ({ className, state, onClick }) => {
  return (
    <div className={c(className, "fbh fbjc fbac hand usn", s.clear_button)} onClick={() => onClick?.()}>
      <span className="text-[12px]">{state ? "Show Screen" : "Clear Screen"}</span>
    </div>
  );
};

export default ClearButton;
