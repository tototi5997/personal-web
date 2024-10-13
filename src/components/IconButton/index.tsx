import Icon from "../Icon";
import c from "classnames";
import s from "./index.module.less";

interface IIconButton {
  name: string;
  iconSize?: number;
  type?: "block" | "single";
  title?: string;
  className?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IIconButton> = (props) => {
  const { type = "single", name, iconSize, className, onClick } = props;

  const handClick = () => {
    onClick?.();
  };

  return (
    <div className={c(s.icon_button, s[`button_${type}`], className, "cursor-pointer trans")} onClick={handClick}>
      <Icon name={name} size={iconSize} />
    </div>
  );
};

export default IconButton;
