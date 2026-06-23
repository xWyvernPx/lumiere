import { observable, observe } from '@legendapp/state'
import { persistObservable } from '@legendapp/state/persist'
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'

export interface ThemeStore {
  activeTheme: 'aura' | 'midnight' | 'forest' | 'lumiere'
}

export const themeStore = observable<ThemeStore>({
  activeTheme: 'lumiere',
})

persistObservable(themeStore, {
  pluginLocal: ObservablePersistLocalStorage,
  local: 'lumiere-theme-pref',
})

// Surgical DOM observer updating document class when themeStore mutates, bypassing React re-renders
observe(() => {
  if (typeof document !== 'undefined') {
    const active = themeStore.activeTheme.get()
    const rootElement = document.documentElement
    rootElement.classList.remove('theme-aura', 'theme-midnight', 'theme-forest', 'theme-lumiere')
    rootElement.classList.add(`theme-${active}`)
  }
})
