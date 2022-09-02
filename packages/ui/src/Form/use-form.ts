import { ref } from 'vue'

export function useInput() {
  const inputEl = ref<HTMLInputElement>()

  function setInputChecked(val: boolean) {
    inputEl.value && (inputEl.value.checked = val)
  }

  function getInputChecked() {
    return inputEl.value?.checked ? true : false
  }

  function setInputValue(val: string | number) {
    inputEl.value && (inputEl.value.value = val.toString())
  }

  function getInputValue() {
    return inputEl.value?.value ?? ''
  }

  function getInputEl() {
    return inputEl.value
  }

  function setFocus() {
    inputEl.value?.focus()
  }

  function setBlur() {
    inputEl.value?.blur()
  }

  return {
    inputEl,
    getInputValue,
    setInputValue,
    getInputChecked,
    setInputChecked,
    getInputEl,
    setFocus,
    setBlur
  }
}
