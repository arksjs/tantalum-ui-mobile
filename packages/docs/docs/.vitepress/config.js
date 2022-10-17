const path = require('path')

module.exports = {
  title: 'ArkUI',
  description: '基于 Vue3 移动端组件库',
  base: '/arkui-mobile-vue/',
  lang: 'zh-CN',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg',
        sizes: '32x32',
        href: '/arkui-mobile-vue/logo.svg'
      }
    ],
    [
      'meta',
      {
        name: 'icon',
        type: 'keywords',
        content: 'vuejs,vue3,vite,ui-components,ui-library,mobile,typescript'
      }
    ]
  ],
  themeConfig: {
    docsBranch: 'main',
    nav: [
      {
        text: '指南',
        link: '/',
        activeMatch: '^/$|^/guide/'
      },
      {
        text: '设计',
        link: '/design/',
        activeMatch: '^/design/'
      },
      {
        text: '组件',
        link: '/components/Button',
        activeMatch: '^/components/'
      },
      {
        text: 'Playground',
        link: '/playground/',
        target: '_blank'
      }
    ],
    sidebar: {
      '/guide/': getGuideSideBar(),
      '/design/': getDesignSideBar(),
      '/components/': getComponentsSideBar(),
      '/': getGuideSideBar()
    },
    logo: '/logo.svg',
    algolia: {
      appId: '3QN7BVCVD6',
      apiKey: '59e6f0e7edc17769c57fec593899939a',
      indexName: 'arkui-mobile-vue'
    }
  },
  markdown: {
    /**
     * markdown-it-attrs 冲突
     * @see https://github.com/vuejs/vitepress/pull/393
     */
    attrs: {
      leftDelimiter: '{{{',
      rightDelimiter: '}}}'
    }
  },
  vite: {
    server: {
      fs: {
        // 可以为项目根目录的上一级提供服务
        allow: [path.resolve('../../')]
      }
    }
  }
}

function getGuideSideBar() {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/' },
        { text: '引入组件', link: '/guide/import' },
        { text: '主题定制', link: '/guide/theme' },
        { text: '黑暗模式', link: '/guide/dark' },
        { text: '国际化', link: '/guide/locale' }
      ]
    }
  ]
}

function getDesignSideBar() {
  return [
    {
      text: '设计',
      items: [
        { text: '设计', link: '/design/' },
        { text: '色彩', link: '/design/color' },
        { text: '渐进式组件', link: '/design/progressive' }
      ]
    }
  ]
}

function getComponentsSideBar() {
  return [
    {
      text: '基础',
      frontmatter: {
        sidebarDepth: 2
      },
      items: [
        { text: 'Button', link: '/components/Button' },
        { text: 'Icon', link: '/components/Icon' },
        { text: 'Image', link: '/components/Image' },
        { text: 'ScrollView', link: '/components/ScrollView' },
        { text: 'Drawer', link: '/components/Drawer' },
        { text: 'Modal', link: '/components/Modal' },
        { text: 'Popover', link: '/components/Popover' },
        { text: 'Dropdown', link: '/components/Dropdown' }
      ]
    },
    {
      text: '反馈',
      items: [
        { text: 'Toast', link: '/components/Toast' },
        { text: 'Dialog', link: '/components/Dialog' },
        { text: 'Notify', link: '/components/Notify' },
        { text: 'ActionSheet', link: '/components/ActionSheet' },
        { text: 'PopDialog', link: '/components/PopDialog' },
        { text: 'SwipeCell', link: '/components/SwipeCell' }
      ]
    },
    {
      text: '数据输入',
      items: [
        { text: 'Form', link: '/components/Form' },
        { text: 'Input', link: '/components/Input' },
        { text: 'Radio', link: '/components/Radio' },
        { text: 'Checkbox', link: '/components/Checkbox' },
        { text: 'Slider', link: '/components/Slider' },
        { text: 'Range', link: '/components/Range' },
        { text: 'Switch', link: '/components/Switch' },
        { text: 'Stepper', link: '/components/Stepper' },
        { text: 'Rate', link: '/components/Rate' },
        { text: 'ImageUploader', link: '/components/ImageUploader' },
        { text: 'Picker', link: '/components/Picker' },
        { text: 'Cascader', link: '/components/Cascader' },
        { text: 'DatePicker', link: '/components/DatePicker' },
        { text: 'Calendar', link: '/components/Calendar' },
        { text: 'SearchBar', link: '/components/SearchBar' },
        { text: 'NumberKeyboard', link: '/components/NumberKeyboard' }
      ]
    },
    {
      text: '导航',
      items: [
        { text: 'BackTop', link: '/components/BackTop' },
        { text: 'NavBar', link: '/components/NavBar' },
        { text: 'PopMenu', link: '/components/PopMenu' },
        { text: 'Tab', link: '/components/Tab' },
        { text: 'SideTab', link: '/components/SideTab' },
        { text: 'TabBar', link: '/components/TabBar' },
        { text: 'TabView', link: '/components/TabView' },
        { text: 'Sticky', link: '/components/Sticky' },
        { text: 'ScrollTab', link: '/components/ScrollTab' },
        { text: 'IndexView', link: '/components/IndexView' },
        { text: 'Fixed', link: '/components/Fixed' },
        { text: 'Pagination', link: '/components/Pagination' }
      ]
    },
    {
      text: '展示',
      items: [
        { text: 'Layout', link: '/components/Layout' },
        { text: 'Cell', link: '/components/Cell' },
        { text: 'Group', link: '/components/Group' },
        { text: 'Collapse', link: '/components/Collapse' },
        { text: 'Empty', link: '/components/Empty' },
        { text: 'Skeleton', link: '/components/Skeleton' },
        { text: 'Swiper', link: '/components/Swiper' },
        { text: 'ImagePreview', link: '/components/ImagePreview' },
        { text: 'FlatList', link: '/components/FlatList' },
        { text: 'NoticeBar', link: '/components/NoticeBar' },
        { text: 'Divider', link: '/components/Divider' },
        { text: 'Badge', link: '/components/Badge' },
        { text: 'Progress', link: '/components/Progress' },
        { text: 'Tag', link: '/components/Tag' },
        { text: 'Order', link: '/components/Order' },
        { text: 'CountDown', link: '/components/CountDown' },
        { text: 'Steps', link: '/components/Steps' },
        { text: 'Price', link: '/components/Price' },
        { text: 'Avatar', link: '/components/Avatar' },
        { text: 'Timeline', link: '/components/Timeline' },
        { text: 'Stopwatch', link: '/components/Stopwatch' },
        { text: 'Result', link: '/components/Result' },
        { text: 'LoadMore', link: '/components/LoadMore' },
        { text: 'TimeAgo', link: '/components/TimeAgo' },
        { text: 'CountUp', link: '/components/CountUp' },
        { text: 'CircleProgress', link: '/components/CircleProgress' },
        { text: 'ActivityIndicator', link: '/components/ActivityIndicator' }
      ]
    },
    {
      text: '其他',
      items: [{ text: 'Copy', link: '/components/Copy' }]
    }
  ]
}
