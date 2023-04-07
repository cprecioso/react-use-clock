import { useEffect, useState } from "react";
import { Handler, createHandler, subscribe } from "./handler";

const handlersMap = new Map<number, Handler>();
const getHandler = (ms: number) => {
  const handleInfo = handlersMap.get(ms);
  if (handleInfo) return handleInfo;

  const newHandleInfo = createHandler(ms);
  handlersMap.set(ms, newHandleInfo);
  return newHandleInfo;
};

export const useCurrentTime = (
  /**
   * How often to update the current time
   * @default 1000
   */
  intervalMs: number = 1000
) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(
    () => subscribe(getHandler(intervalMs), setCurrentTime),
    [intervalMs]
  );

  return currentTime;
};
