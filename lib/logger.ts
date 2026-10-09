type Level = "debug" | "info" | "warn" | "error";

const levelRank: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function minLevel(): Level {
  if (process.env.NODE_ENV === "production") return "warn";
  return (process.env.LOG_LEVEL as Level | undefined) ?? "info";
}

function shouldLog(level: Level) {
  return levelRank[level] >= levelRank[minLevel()];
}

export const logger = {
  debug(...args: unknown[]) {
    if (shouldLog("debug")) console.debug("[kokonus]", ...args);
  },
  info(...args: unknown[]) {
    if (shouldLog("info")) console.info("[kokonus]", ...args);
  },
  warn(...args: unknown[]) {
    if (shouldLog("warn")) console.warn("[kokonus]", ...args);
  },
  error(...args: unknown[]) {
    if (shouldLog("error")) console.error("[kokonus]", ...args);
  },
};
