export const baseList = [
  {
    value: 1,
    label: '首页',
    icon: 'HomeOutlined'
  },
  {
    value: 2,
    label: '搜索',
    icon: 'SearchOutlined'
  },
  {
    value: 3,
    label: '我的',
    icon: 'UserOutlined'
  },
  {
    value: 4,
    label: '设置',
    icon: 'SettingOutlined'
  }
]

export const badgeList = [
  {
    value: 1,
    label: '首页',
    icon: 'HomeOutlined',
    badge: '热'
  },
  {
    value: 2,
    label: '搜索',
    icon: 'SearchOutlined',
    badge: {
      dot: true,
      content: 1
    }
  },
  {
    value: 3,
    label: '我的',
    icon: 'UserOutlined',
    badge: 1
  },
  {
    value: 4,
    label: '设置',
    icon: 'SettingOutlined',
    badge: 100
  }
]

export const imageList = ['home', 'category', 'cart', 'my'].map((v, k) => {
  return {
    icon: `https://cdn.fox2.cn/vfox/tab-bar/${v}@3x.png`,
    activeIcon: `https://cdn.fox2.cn/vfox/tab-bar/${v}-selected@3x.png`,
    label: v,
    value: k + 1
  }
})
