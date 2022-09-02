# 黑暗模式

## 介绍

组件库内置黑暗主题，往 `body` 标签添加属性就可以便捷的切换。

## DarkMode

如果想要切换到黑暗模式：

```JavaScript
document.body.setAttribute('ak-theme', 'dark')
```

如果想要恢复明亮模式：

```JavaScript
document.body.removeAttribute('ak-theme')
```

如果要跟随系统切换：

```JavaScript
function setDark(dark) {
  dark ? document.body.setAttribute('ak-theme', 'dark') : document.body.removeAttribute('ak-theme')
}

const mm =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

if (mm) {
  mm.addEventListener('change', e => {
    setDark(e.matches)
  })

  setDark(mm.matches)
}

```
