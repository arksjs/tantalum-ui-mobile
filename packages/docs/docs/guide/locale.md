# 国际化

## 简介

组件库默认的文案语言是中文，支持多语言切换，目前支持 **中文** 和 **英文**。

## ConfigProvider

如果想要使用英文：

```vue
<script setup>
import enUS from 'tantalum-ui-mobile/es/locale/lang/en-US'
</script>

<template>
  <ta-config-provider :locale="enUS">
    <App />
  </ta-config-provider>
</template>
```

注：

- 也可以对语言包做部分修改后传入。
