import { useRoutes } from "react-router-dom";
import { routerConfig } from "./router";
import ModalRoot, { ModalContext } from "./modals/ModalRoot";
import useInitModal from "./hooks/useInitModal";
import { useInitGlobalRouter } from "./hooks/useGlobalRouter";

const App = () => {
  // Global Router used in axios interceptors
  useInitGlobalRouter();

  const element = useRoutes(routerConfig);
  const { modalRef, globalModal } = useInitModal();

  // You can add <ProtectRouter /> if you need to do route protect

  return (
    <ModalContext.Provider value={globalModal}>
      <ModalRoot ref={modalRef} />
      {element}
    </ModalContext.Provider>
  );
};

export default App;
