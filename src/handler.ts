export type TickListener = (date: Date) => void;

export interface Handler {
  readonly ms: number;
  readonly listeners: Set<TickListener>;
  timer: ReturnType<typeof setInterval> | null;
}

export const createHandler = (ms: number): Handler => ({
  ms,
  listeners: new Set(),
  timer: null,
});

const start = (handler: Handler) => {
  if (handler.timer != null) return;
  handler.timer = setInterval(() => {
    const date = new Date();
    for (const listener of handler.listeners) listener(date);
  }, handler.ms);
};

const stop = (handler: Handler) => {
  if (handler.timer == null) return;
  clearInterval(handler.timer);
};

export const subscribe = (handler: Handler, listener: TickListener) => {
  listener(new Date());
  handler.listeners.add(listener);
  start(handler);

  return () => {
    handler.listeners.delete(listener);
    if (handler.listeners.size === 0) stop(handler);
  };
};
