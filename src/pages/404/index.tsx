import c from "classnames";
import s from "./index.module.less";

const NotFoundPage = () => {
  return (
    <div className={c(s.not_found_page)}>
      <p className="text-[30px] font-600">404 Not Found</p>
    </div>
  );
};

export default NotFoundPage;
