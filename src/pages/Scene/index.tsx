import { useEffect, useRef, useState } from "react";
import { MainScene } from "./mian";
import MusicPlayer, { MusicPlayerRef } from "@/components/MusicPlayer";
import TextFlow, { TextFlowRef } from "@/components/TextFlow";
import { finalQuestions, questions, welcome } from "./config";
import ClearButton from "@/components/ClearButton";
import c from "classnames";
import s from "./index.module.less";

const Scene = () => {
  const ref = useRef(null);
  const playerRef = useRef<MusicPlayerRef>(null);
  const textFlowRef = useRef<TextFlowRef>(null);
  const instanceRef = useRef<MainScene | null>(null);

  const [clearScreen, setCrearScreen] = useState(false);
  const [isSceneLoading, setSceneLoading] = useState(true);
  const [showScene, setScene] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState(questions);

  const [textObj, setTextObj] = useState(welcome);

  useEffect(() => {
    if (ref.current) {
      instanceRef.current = new MainScene(ref.current, () => {
        setSceneLoading(false);
      });
    }
  }, [ref]);

  const onTextFinish = () => {
    setShowQuestions(true);
  };

  const handleEnterScene = () => {
    setScene(true);
    playerRef.current?.play();
    textFlowRef.current?.start();
  };

  const handleClickQuestionItem = (que: { key: number; label: string; answer: string }) => {
    setShowQuestions(false);
    setTextObj(que);
    switch (que.key) {
      case 4:
        setCurrentQuestions(finalQuestions);
        instanceRef.current?.moveCameraFar();
        break;
      case 4001:
        setCurrentQuestions(questions);
        instanceRef.current?.moveCameraCloser();
        break;
      default:
        instanceRef.current?.moveCameraCloser();
    }
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
        <ClearButton className={c(s.clear_button, "pa")} state={clearScreen} onClick={() => setCrearScreen(!clearScreen)} />
        {!clearScreen && (
          <>
            <div className={c(s.conversation, "pa w-200")}>
              {showScene && <TextFlow text={textObj.answer} onFinish={onTextFinish} showSkip={textObj.key !== 4} />}
              {showQuestions && (
                <div className="fbv mt-40 gap-10">
                  {currentQuestions.map((que) => (
                    <div key={que.key} className={c(s.questions, "text-[12px] hand")} onClick={() => handleClickQuestionItem(que)}>
                      {que.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Scene;
