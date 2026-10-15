export const UI_THEME_STORAGE_KEY = "kokonus-ui-theme";

/** Default produksi: wireframe lo-fi (monokrom, radius 0). */
export type UiThemeId = "wireframe" | "lime";

export const UI_THEME_DEFAULT: UiThemeId = "wireframe";

export function isUiThemeId(value: string | null | undefined): value is UiThemeId {
  return value === "wireframe" || value === "lime";
}

export function readUiThemeFromStorage(): UiThemeId {
  if (typeof window === "undefined") return UI_THEME_DEFAULT;
  try {
    const raw = window.localStorage.getItem(UI_THEME_STORAGE_KEY);
    return isUiThemeId(raw) ? raw : UI_THEME_DEFAULT;
  } catch {
    return UI_THEME_DEFAULT;
  }
}

export function applyUiThemeToDocument(theme: UiThemeId) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.uiTheme = theme;
  root.classList.toggle("lime-ui", theme === "lime");
}
