import regionOptions from './region'

const options: number[] = []
for (let i = 2000; i <= 2020; i++) {
  options.push(i)
}

const multiOptions = [options, ['春', '夏', '秋', '冬']]

const cascadeOptions = [
  {
    label: '空调',
    value: 'kongtiao',
    children: [
      {
        label: '家用空调',
        value: 'jiayongkongtiao',
        children: [
          {
            label: '挂式空调',
            value: 'guashikongtiao'
          },
          {
            label: '柜式空调',
            value: 'guishikongtiao'
          }
        ]
      },
      {
        label: '厨房空调',
        value: 'chufangkongtiao'
      }
    ]
  },
  {
    label: '冰箱',
    value: 'bingxiang',
    children: [
      {
        label: '双门',
        value: 'shuangmen'
      },
      {
        label: '三门',
        value: 'sanmen'
      },
      {
        label: '对开门',
        value: 'duikaimen'
      },
      {
        label: '多门',
        value: 'duomen'
      }
    ]
  },
  {
    label: '洗衣机',
    value: 'xiyiji',
    children: [
      {
        label: '波轮',
        value: 'bolun'
      },
      {
        label: '滚筒',
        value: 'guntong'
      },
      {
        label: '洗烘一体',
        value: 'xihongyiti'
      }
    ]
  },
  {
    label: '厨卫大电',
    value: 'chuweidadian',
    children: [
      {
        label: '油烟机',
        value: 'youyanji'
      },
      {
        label: '燃气灶',
        value: 'ranqizao'
      },
      {
        label: '消毒柜',
        value: 'xiaodugui'
      },
      {
        label: '洗碗机',
        value: 'xiwanji'
      }
    ]
  },
  {
    label: '厨卫小电',
    value: 'chuweixiaodian',
    children: [
      {
        label: '破壁机',
        value: 'pobiji'
      },
      {
        label: '电饭锅',
        value: 'dianfanguo'
      },
      {
        label: '微波炉',
        value: 'weibolu'
      },
      {
        label: '电水壶',
        value: 'dianshuihu'
      },
      {
        label: '电压力锅',
        value: 'dianyaliguo'
      },
      {
        label: '电磁炉',
        value: 'diancilu'
      },
      {
        label: '烤箱',
        value: 'kaoxiang'
      },
      {
        label: '豆浆机',
        value: 'doujiangji'
      }
    ]
  },
  {
    label: '生活电器',
    value: 'shenghuodianqi',
    children: [
      {
        label: '取暖器',
        value: 'qunuanqi'
      },
      {
        label: '空气净化器',
        value: 'kongqijinghuaqi'
      },
      {
        label: '扫地机',
        value: 'saodiji'
      },
      {
        label: '除湿机',
        value: 'chushiji'
      },
      {
        label: '电风扇',
        value: 'dianfengshan'
      },
      {
        label: '吸尘器',
        value: 'xichenqi'
      },
      {
        label: '加湿器',
        value: 'jiashiqi'
      },
      {
        label: '挂烫机',
        value: 'guatangji'
      }
    ]
  }
]

export { options, multiOptions, cascadeOptions, regionOptions }
