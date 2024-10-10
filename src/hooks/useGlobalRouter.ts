import { NavigateFunction, useNavigate } from "react-router-dom";

const globalRouter = { navigate: null } as { navigate: null | NavigateFunction };

const useInitGlobalRouter = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  return globalRouter;
};

export { globalRouter, useInitGlobalRouter };
