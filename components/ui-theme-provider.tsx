"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  UI_THEME_DEFAULT,
  UI_THEME_STORAGE_KEY,
  applyUiThemeToDocument,
  readUiThemeFromStorage,
  type UiThemeId,
} from "@/lib/ui-theme";

type UiThemeContextValue = {
  theme: UiThemeId;
  setTheme: (next: UiThemeId) => void;
};

const UiThemeContext = createContext<UiThemeContextValue | null>(null);

export function UiThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<UiThemeId>(UI_THEME_DEFAULT);

  useEffect(() => {
    const stored = readUiThemeFromStorage();
    setThemeState(stored);
    applyUiThemeToDocument(stored);
  }, []);

  const setTheme = useCallback((next: UiThemeId) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(UI_THEME_STORAGE_KEY, next);
    } catch {
      /* abaikan mode private */
    }
    applyUiThemeToDocument(next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <UiThemeContext.Provider value={value}>{children}</UiThemeContext.Provider>;
}

export function useUiTheme() {
  const ctx = useContext(UiThemeContext);
  if (!ctx) {
    throw new Error("useUiTheme harus dipakai di dalam UiThemeProvider");
  }
  return ctx;
}
