import { observable, observe } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export interface ThemeStore {
  activeTheme: "aura" | "midnight" | "forest" | "lumiere";
}

export const themeStore = observable<ThemeStore>({
  activeTheme: "lumiere",
});

persistObservable(themeStore, {
  pluginLocal: ObservablePersistLocalStorage,
  local: "lumiere-theme-pref",
});

// Theme handling is now purely CSS variables driven by :root in indexing.css
observe(() => {
  if (typeof document !== "undefined") {
    // Keep it empty as the whole app is now Lumière natively
  }
});
