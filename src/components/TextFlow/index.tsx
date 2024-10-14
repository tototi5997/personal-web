import React, { useEffect, useRef, useState } from "react";
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

const TextFlow: React.FC<TextFlowProps> = ({ text, classname, speed = 100, onFinish }) => {
  const [displayedText, setDisplayedText] = useState("");

  const indexRef = useRef(0); // 当前输出下标
  const intervalId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null); // 记录开始时间

  const step = (timestamp: number) => {
    if (!startTime.current) startTime.current = timestamp;
    const elapsed = timestamp - startTime.current;

    // 每间隔 speed 毫秒，绘制一个字符
    if (elapsed >= speed) {
      if (indexRef.current < text.length) {
        indexRef.current++;
        setDisplayedText((prev) => {
          return prev + text[indexRef.current - 1];
        });

        startTime.current = timestamp; // 重置开始时间
      } else {
        onFinish?.();
      }
    }

    if (indexRef.current <= text.length) {
      intervalId.current = requestAnimationFrame(step); // 请求下一帧
    }
  };

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");
    intervalId.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(intervalId.current!);
    };
  }, [text]);

  return <code className={c(classname, s.text_flow, "white-1")}>{displayedText}</code>;
};

export default TextFlow;
