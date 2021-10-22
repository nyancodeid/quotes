import { computed, watch, ref } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { Theme } from '../types.d'

const useTheme = () => {
  const theme = useStorage('theme', Theme.System)
  const isSystemDark = usePreferredDark()
  const isThemeMounted = ref<boolean>(false)

  const themeSteps = computed<Array<string>>(() => {
    return isSystemDark.value
      ? [Theme.System, Theme.Light, Theme.Dark]
      : [Theme.System, Theme.Dark, Theme.Light]
  })

  const themeIndex = computed<number>(() => {
    return themeSteps.value.findIndex(t => t === theme.value)
  })

  const nextTheme = computed<Theme | string>(() => {
    const nextThemeIndex = (themeIndex.value + 1) % themeSteps.value.length
    return themeSteps.value[nextThemeIndex]
  })

  const titleTheme = computed<string>(() => {
    switch (nextTheme.value) {
      case Theme.Dark:
        return 'Ubah ke Mode Gelap'

      case Theme.Light:
        return 'Ubah ke Mode Terang'

      default:
        return 'Ubah ke Tema Sistem'
    }
  })

  const updateTheme = () => {
    const element = document.documentElement

    switch (theme.value) {
      case Theme.System:
        if (isSystemDark.value)
          element?.classList.add('dark')

        else
          element?.classList.remove('dark')

        break

      case Theme.Dark:
        element?.classList.add('dark')
        break

      case Theme.Light:
        element?.classList.remove('dark')
        break
    }
  }

  const toggleTheme = () => {
    theme.value = nextTheme.value

    updateTheme()
  }

  watch(isSystemDark, () => {
    if (theme.value === Theme.System)
      updateTheme()
  })

  return {
    theme, titleTheme, isThemeMounted, toggleTheme, updateTheme,
  }
}

export default useTheme
