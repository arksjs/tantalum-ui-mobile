import{_ as t,c as o,a as p,w as e,b as a,d as n,e as c,r as l,o as r}from"./app.22089141.js";const _='{"title":"TabBar \u6807\u7B7E\u5217","description":"","frontmatter":{},"headers":[{"level":2,"title":"Import","slug":"import"},{"level":3,"title":"Import Type","slug":"import-type"},{"level":2,"title":"Props","slug":"props"},{"level":3,"title":"TabOptions","slug":"taboptions"},{"level":3,"title":"BadgeOption","slug":"badgeoption"},{"level":2,"title":"Events","slug":"events"},{"level":3,"title":"change \u7684\u56DE\u8C03\u53C2\u6570","slug":"change-\u7684\u56DE\u8C03\u53C2\u6570"},{"level":2,"title":"Methods","slug":"methods"}],"relativePath":"components/TabBar.md"}',u={},k=a("h1",{id:"tabbar-\u6807\u7B7E\u5217",tabindex:"-1"},[n("TabBar \u6807\u7B7E\u5217 "),a("a",{class:"header-anchor",href:"#tabbar-\u6807\u7B7E\u5217","aria-hidden":"true"},"#")],-1),i=a("div",{class:"language-vue"},[a("pre",null,[a("code",null,[a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("template")]),a("span",{class:"token punctuation"},">")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-group")]),n(),a("span",{class:"token attr-name"},"title"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("\u57FA\u7840\u7528\u6CD5"),a("span",{class:"token punctuation"},'"')]),a("span",{class:"token punctuation"},">")]),n(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-tab-bar")]),n(),a("span",{class:"token attr-name"},":options"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("baseList"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token attr-name"},[a("span",{class:"token namespace"},"v-model:"),n("activeValue")]),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("activeValue"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token punctuation"},"/>")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("ak-group")]),a("span",{class:"token punctuation"},">")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-group")]),n(),a("span",{class:"token attr-name"},"title"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("\u5FBD\u6807"),a("span",{class:"token punctuation"},'"')]),a("span",{class:"token punctuation"},">")]),n(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-tab-bar")]),n(),a("span",{class:"token attr-name"},":options"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("badgeList"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token punctuation"},"/>")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("ak-group")]),a("span",{class:"token punctuation"},">")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-group")]),n(),a("span",{class:"token attr-name"},"title"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("\u81EA\u5B9A\u4E49\u56FE\u6807"),a("span",{class:"token punctuation"},'"')]),a("span",{class:"token punctuation"},">")]),n(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-tab-bar")]),n(),a("span",{class:"token attr-name"},":options"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("customIconList"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token punctuation"},"/>")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("ak-group")]),a("span",{class:"token punctuation"},">")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-group")]),n(),a("span",{class:"token attr-name"},"title"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("\u81EA\u5B9A\u4E49\u989C\u8272"),a("span",{class:"token punctuation"},'"')]),a("span",{class:"token punctuation"},">")]),n(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-tab-bar")]),n(`
      `),a("span",{class:"token attr-name"},"color"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("#8B8DB8"),a("span",{class:"token punctuation"},'"')]),n(`
      `),a("span",{class:"token attr-name"},"activeColor"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("#ffffff"),a("span",{class:"token punctuation"},'"')]),n(`
      `),a("span",{class:"token special-attr"},[a("span",{class:"token attr-name"},"style"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),a("span",{class:"token value css language-css"},[a("span",{class:"token property"},"background-color"),a("span",{class:"token punctuation"},":"),n(" #6667ab")]),a("span",{class:"token punctuation"},'"')])]),n(`
      `),a("span",{class:"token attr-name"},":options"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("baseList"),a("span",{class:"token punctuation"},'"')]),n(`
    `),a("span",{class:"token punctuation"},"/>")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("ak-group")]),a("span",{class:"token punctuation"},">")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-group")]),n(),a("span",{class:"token attr-name"},"title"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("\u81EA\u5B9A\u4E49\u56FE\u7247\uFF08icon=URL\uFF09"),a("span",{class:"token punctuation"},'"')]),a("span",{class:"token punctuation"},">")]),n(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-tab-bar")]),n(),a("span",{class:"token attr-name"},"class"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("exp-tabBar-custom"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token attr-name"},":options"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("imageList"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token punctuation"},"/>")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("ak-group")]),a("span",{class:"token punctuation"},">")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-group")]),n(),a("span",{class:"token attr-name"},"title"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("\u914D\u5408 Fixed \u5B9E\u73B0\u7F6E\u5E95"),a("span",{class:"token punctuation"},'"')]),a("span",{class:"token punctuation"},">")]),n(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-fixed")]),a("span",{class:"token punctuation"},">")]),n(`
      `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("ak-tab-bar")]),n(),a("span",{class:"token attr-name"},":options"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("baseList"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token attr-name"},[a("span",{class:"token namespace"},"v-model:"),n("activeValue")]),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("activeValue"),a("span",{class:"token punctuation"},'"')]),n(),a("span",{class:"token punctuation"},"/>")]),n(`
    `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("ak-fixed")]),a("span",{class:"token punctuation"},">")]),n(`
  `),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("ak-group")]),a("span",{class:"token punctuation"},">")]),n(`
`),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("template")]),a("span",{class:"token punctuation"},">")]),n(`

`),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"<"),n("script")]),n(),a("span",{class:"token attr-name"},"lang"),a("span",{class:"token attr-value"},[a("span",{class:"token punctuation attr-equals"},"="),a("span",{class:"token punctuation"},'"'),n("ts"),a("span",{class:"token punctuation"},'"')]),a("span",{class:"token punctuation"},">")]),a("span",{class:"token script"},[a("span",{class:"token language-javascript"},[n(`
`),a("span",{class:"token keyword"},"import"),n(),a("span",{class:"token punctuation"},"{"),n(" baseList"),a("span",{class:"token punctuation"},","),n(" badgeList"),a("span",{class:"token punctuation"},","),n(" imageList "),a("span",{class:"token punctuation"},"}"),n(),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},"'./data'"),n(`
`),a("span",{class:"token keyword"},"import"),n(),a("span",{class:"token punctuation"},"{"),n(" defineComponent"),a("span",{class:"token punctuation"},","),n(" markRaw "),a("span",{class:"token punctuation"},"}"),n(),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},"'vue'"),n(`
`),a("span",{class:"token keyword"},"import"),n(" TaobaoSvg "),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},"'../../../assets/icons/taobao.svg?vueComponent'"),n(`
`),a("span",{class:"token keyword"},"import"),n(" QqSvg "),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},"'../../../assets/icons/qq.svg?vueComponent'"),n(`
`),a("span",{class:"token keyword"},"import"),n(" WechatSvg "),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},"'../../../assets/icons/wechat.svg?vueComponent'"),n(`
`),a("span",{class:"token keyword"},"import"),n(" WeiboSvg "),a("span",{class:"token keyword"},"from"),n(),a("span",{class:"token string"},"'../../../assets/icons/weibo.svg?vueComponent'"),n(`

`),a("span",{class:"token keyword"},"const"),n(" customIconList "),a("span",{class:"token operator"},"="),n(),a("span",{class:"token punctuation"},"["),n(`
  `),a("span",{class:"token punctuation"},"{"),n(`
    `),a("span",{class:"token literal-property property"},"value"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'wechat'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"label"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'\u5FAE\u4FE1'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"icon"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token function"},"markRaw"),a("span",{class:"token punctuation"},"("),n("WechatSvg"),a("span",{class:"token punctuation"},")"),n(`
  `),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},","),n(`
  `),a("span",{class:"token punctuation"},"{"),n(`
    `),a("span",{class:"token literal-property property"},"value"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'qq'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"label"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'QQ'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"icon"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token function"},"markRaw"),a("span",{class:"token punctuation"},"("),n("QqSvg"),a("span",{class:"token punctuation"},")"),n(`
  `),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},","),n(`
  `),a("span",{class:"token punctuation"},"{"),n(`
    `),a("span",{class:"token literal-property property"},"value"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'weibo'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"label"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'\u5FAE\u535A'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"icon"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token function"},"markRaw"),a("span",{class:"token punctuation"},"("),n("WeiboSvg"),a("span",{class:"token punctuation"},")"),n(`
  `),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},","),n(`
  `),a("span",{class:"token punctuation"},"{"),n(`
    `),a("span",{class:"token literal-property property"},"value"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'taobao'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"label"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'\u6DD8\u5B9D'"),a("span",{class:"token punctuation"},","),n(`
    `),a("span",{class:"token literal-property property"},"icon"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token function"},"markRaw"),a("span",{class:"token punctuation"},"("),n("TaobaoSvg"),a("span",{class:"token punctuation"},")"),n(`
  `),a("span",{class:"token punctuation"},"}"),n(`
`),a("span",{class:"token punctuation"},"]"),n(`

`),a("span",{class:"token keyword"},"export"),n(),a("span",{class:"token keyword"},"default"),n(),a("span",{class:"token function"},"defineComponent"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},"{"),n(`
  `),a("span",{class:"token literal-property property"},"name"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token string"},"'ExpTabBar'"),a("span",{class:"token punctuation"},","),n(`
  `),a("span",{class:"token function"},"data"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),n(),a("span",{class:"token punctuation"},"{"),n(`
    `),a("span",{class:"token keyword"},"return"),n(),a("span",{class:"token punctuation"},"{"),n(`
      `),a("span",{class:"token literal-property property"},"activeValue"),a("span",{class:"token operator"},":"),n(),a("span",{class:"token number"},"1"),a("span",{class:"token punctuation"},","),n(`
      customIconList`),a("span",{class:"token punctuation"},","),n(`
      baseList`),a("span",{class:"token punctuation"},","),n(`
      badgeList`),a("span",{class:"token punctuation"},","),n(`
      imageList
    `),a("span",{class:"token punctuation"},"}"),n(`
  `),a("span",{class:"token punctuation"},"}"),n(`
`),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},")"),n(`
`)])]),a("span",{class:"token tag"},[a("span",{class:"token tag"},[a("span",{class:"token punctuation"},"</"),n("script")]),a("span",{class:"token punctuation"},">")]),n(`
`)])])],-1),d=c("",26);function g(b,h,m,v,y,f){const s=l("CodeDemo");return r(),o("div",null,[k,p(s,{name:"TabBar"},{default:e(()=>[i]),_:1}),d])}var T=t(u,[["render",g]]);export{_ as __pageData,T as default};