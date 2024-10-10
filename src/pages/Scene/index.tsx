import { useEffect, useRef } from "react";
import { MainScene } from "./mian";

const Scene = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) new MainScene(ref.current);
  }, [ref]);

  return <div ref={ref} />;
};

export default Scene;
