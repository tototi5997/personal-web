import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import c from "classnames";
import s from "./index.module.less";

interface TextFlowProps {
  text: string;
  classname?: string;
  speed?: number;
  onFinish?: () => void;
}

export type TextFlowRef = {
  start: () => void;
};

const TextFlow = forwardRef<TextFlowRef, TextFlowProps>(({ text, classname, speed = 100, onFinish }, ref) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const intervalId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null); // 记录开始时间

  const step = (timestamp: number) => {
    if (!startTime.current) startTime.current = timestamp;

    const elapsed = timestamp - startTime.current;

    if (elapsed >= speed) {
      if (indexRef.current < text.length - 1) {
        setDisplayedText((prev) => {
          return prev + text[indexRef.current];
        });
        indexRef.current++;
        startTime.current = timestamp; // 重置开始时间
      } else {
        onFinish?.();
      }
    }

    if (indexRef.current < text.length) {
      intervalId.current = requestAnimationFrame(step); // 请求下一帧
    }
  };

  const startTextFlow = () => {
    intervalId.current = requestAnimationFrame(step);
  };

  useImperativeHandle(ref, () => {
    return {
      start: () => {
        indexRef.current = 0;
        setDisplayedText("");
        startTextFlow();
      },
    };
  });

  return <code className={c(classname, s.text_flow, "white-1")}>{displayedText}</code>;
});

export default TextFlow;
