import { useEffect, useRef, useState } from "react";
import { MainScene } from "./mian";
import MusicPlayer, { MusicPlayerRef } from "@/components/MusicPlayer";
import TextFlow, { TextFlowRef } from "@/components/TextFlow";
import c from "classnames";
import s from "./index.module.less";
import { questions } from "./config";

const Scene = () => {
  const ref = useRef(null);
  const playerRef = useRef<MusicPlayerRef>(null);
  const textFlowRef = useRef<TextFlowRef>(null);

  const [isSceneLoading, setSceneLoading] = useState(true);
  const [showScene, setScene] = useState(false);
  const [showQuestions, setQuestions] = useState(false);
  const [text, setText] = useState("Hello, welcome to my world, this is my planet, please enjoy it.");

  useEffect(() => {
    if (ref.current) {
      new MainScene(ref.current, () => {
        setSceneLoading(false);
      });
    }
  }, [ref]);

  const onTextFinish = () => {
    setQuestions(true);
  };

  const handleEnterScene = () => {
    setScene(true);
    playerRef.current?.play();
    textFlowRef.current?.start();
  };

  return (
    <>
      {!showScene && (
        <div className={c("w-full h-full fbh fbac fbjc pa z-10", s.loading_page)}>
          {isSceneLoading ? (
            <p className="text-[20px] font-[600] usn">Loading ...</p>
          ) : (
            <div className="text-[20px] font-[600] hand" onClick={handleEnterScene}>
              Click To Enter
            </div>
          )}
        </div>
      )}
      <div ref={ref} className={c("pr white-1")}>
        <MusicPlayer className={c(s.music_player, "pa")} ref={playerRef} />
        <div className={c(s.conversation, "pa w-200")}>
          {showScene && <TextFlow text={text} onFinish={onTextFinish} />}
          {showQuestions && (
            <div className="fbv mt-40 gap-10">
              {questions.map((que) => (
                <div
                  key={que.key}
                  className={c(s.questions, "text-[12px] hand")}
                  onClick={() => {
                    setQuestions(false);
                    setText("Test text");
                  }}
                >
                  {que.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Scene;
