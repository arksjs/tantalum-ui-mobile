export function copy($el: HTMLInputElement) {
  $el.select()
  document.execCommand('Copy')
}
