import { ref } from 'vue'

export default function useDark() {
  const isDarkTheme = ref(false)

  let mm: MediaQueryList | null = null

  const cacheKey = 'demo-dark'
  const userDark = localStorage.getItem(cacheKey)

  if (userDark === 'true' || userDark === 'false') {
    switchTheme(Boolean(userDark === 'true'))
  } else {
    mm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

    if (mm) {
      mm.addEventListener('change', onSwitchTheme)

      switchTheme(mm.matches)
    }
  }

  function onSwitchTheme(e: MediaQueryListEvent) {
    switchTheme(e.matches)
  }

  function switchTheme(isDark: boolean) {
    if (!isDark) {
      document.body.removeAttribute('ak-theme')
    } else {
      document.body.setAttribute('ak-theme', 'dark')
    }
    isDarkTheme.value = isDark
  }

  return {
    isDarkTheme,
    switchTheme: (isDark: boolean) => {
      switchTheme(isDark)

      mm && mm.removeEventListener('change', onSwitchTheme)
      localStorage.setItem(cacheKey, String(isDark))
    },
    sessionSwitchTheme(isDark: boolean) {
      switchTheme(isDark)

      mm && mm.removeEventListener('change', onSwitchTheme)
    }
  }
}
