import{_ as s,c as o,a as e,w as p,b as n,d as t,e as c,r as l,o as u}from"./app.d5ee8cac.js";const C='{"title":"ActionSheet \u52A8\u4F5C\u9762\u677F","description":"","frontmatter":{},"headers":[{"level":2,"title":"Import","slug":"import"},{"level":3,"title":"Import Type","slug":"import-type"},{"level":2,"title":"Props","slug":"props"},{"level":3,"title":"ActionSheetOption \u7684\u7ED3\u6784","slug":"actionsheetoption-\u7684\u7ED3\u6784"},{"level":2,"title":"Events","slug":"events"},{"level":3,"title":"VisibleState \u503C\u8BF4\u660E","slug":"visiblestate-\u503C\u8BF4\u660E"},{"level":2,"title":"showActionSheet(object)","slug":"showactionsheet-object"},{"level":3,"title":"object","slug":"object"},{"level":3,"title":"Usage","slug":"usage"}],"relativePath":"components/ActionSheet.md"}',i={},k=n("h1",{id:"actionsheet-\u52A8\u4F5C\u9762\u677F",tabindex:"-1"},[t("ActionSheet \u52A8\u4F5C\u9762\u677F "),n("a",{class:"header-anchor",href:"#actionsheet-\u52A8\u4F5C\u9762\u677F","aria-hidden":"true"},"#")],-1),r=n("div",{class:"language-vue"},[n("pre",null,[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("template")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-group")]),t(),n("span",{class:"token attr-name"},"title"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u57FA\u7840\u7528\u6CD5"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u9ED8\u8BA4"),n("span",{class:"token punctuation"},'"')]),t(),n("span",{class:"token attr-name"},"isLink"),t(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("visible = true"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(`
      `),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u5C55\u793A\u6807\u9898"),n("span",{class:"token punctuation"},'"')]),t(`
      `),n("span",{class:"token attr-name"},"isLink"),t(`
      `),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t(";(title = "),n("span",{class:"token punctuation"},"'"),t("\u6807\u9898"),n("span",{class:"token punctuation"},"'"),t("), (visible = true)"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(`
      `),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u5C55\u793A\u53D6\u6D88\u6309\u94AE"),n("span",{class:"token punctuation"},'"')]),t(`
      `),n("span",{class:"token attr-name"},"isLink"),t(`
      `),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t(";(showCancel = true), (visible = true)"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(`
      `),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u8BBE\u7F6E\u53D6\u6D88\u6309\u94AE\u6587\u6848"),n("span",{class:"token punctuation"},'"')]),t(`
      `),n("span",{class:"token attr-name"},"isLink"),t(`
      `),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t(`
        ;(showCancel = true),
          (cancelText = `),n("span",{class:"token punctuation"},"'"),t("\u81EA\u5B9A\u4E49\u53D6\u6D88\u6309\u94AE\u6587\u6848"),n("span",{class:"token punctuation"},"'"),t(`),
          (visible = true)
      `),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-group")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-group")]),t(),n("span",{class:"token attr-name"},"title"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("options \u6269\u5C55"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(`
      `),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u9009\u9879\u63CF\u8FF0"),n("span",{class:"token punctuation"},'"')]),t(`
      `),n("span",{class:"token attr-name"},"isLink"),t(`
      `),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t(`
        ;(options = [
          {
            name: `),n("span",{class:"token punctuation"},"'"),t("\u9009\u98791"),n("span",{class:"token punctuation"},"'"),t(`,
            description: `),n("span",{class:"token punctuation"},"'"),t("\u9009\u98791\u7684\u63CF\u8FF0\u6587\u6848"),n("span",{class:"token punctuation"},"'"),t(`
          },
          {
            name: `),n("span",{class:"token punctuation"},"'"),t("\u9009\u98792"),n("span",{class:"token punctuation"},"'"),t(`
          },
          {
            name: `),n("span",{class:"token punctuation"},"'"),t("\u9009\u98793"),n("span",{class:"token punctuation"},"'"),t(`
          }
        ]),
          (visible = true)
      `),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(`
      `),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u9009\u9879\u9AD8\u4EAE"),n("span",{class:"token punctuation"},'"')]),t(`
      `),n("span",{class:"token attr-name"},"isLink"),t(`
      `),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t(`
        ;(options = [
          {
            name: `),n("span",{class:"token punctuation"},"'"),t("\u9009\u98791"),n("span",{class:"token punctuation"},"'"),t(`,
            highlight: true
          },
          {
            name: `),n("span",{class:"token punctuation"},"'"),t("\u9009\u98792"),n("span",{class:"token punctuation"},"'"),t(`
          },
          {
            name: `),n("span",{class:"token punctuation"},"'"),t("\u9009\u98793"),n("span",{class:"token punctuation"},"'"),t(`
          }
        ]),
          (visible = true)
      `),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-group")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-group")]),t(),n("span",{class:"token attr-name"},"title"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("\u4E8B\u4EF6\u76D1\u542C"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(`
      `),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("confirm/cancel"),n("span",{class:"token punctuation"},'"')]),t(`
      `),n("span",{class:"token attr-name"},"isLink"),t(`
      `),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t(";(showCancel = true), (showEvent = true), (visible = true)"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(`
      `),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("visible-state-change"),n("span",{class:"token punctuation"},'"')]),t(`
      `),n("span",{class:"token attr-name"},"isLink"),t(`
      `),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t(";(visibleEvent = true), (visible = true)"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-group")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-group")]),t(),n("span",{class:"token attr-name"},"title"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("API"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),t(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-cell")]),t(),n("span",{class:"token attr-name"},"label"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("showActionSheet"),n("span",{class:"token punctuation"},'"')]),t(),n("span",{class:"token attr-name"},"isLink"),t(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("onCallApi()"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-cell")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-group")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("ak-action-sheet")]),t(`
    `),n("span",{class:"token attr-name"},[n("span",{class:"token namespace"},"v-model:"),t("visible")]),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("visible"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token attr-name"},":title"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("title"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token attr-name"},":options"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("options"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token attr-name"},":show-cancel"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("showCancel"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token attr-name"},":cancel-text"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("cancelText"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token attr-name"},"@confirm"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("onConfirm"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token attr-name"},"@cancel"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("onCancel"),n("span",{class:"token punctuation"},'"')]),t(`
    `),n("span",{class:"token attr-name"},"@visibleStateChange"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("onVisibleStateChange"),n("span",{class:"token punctuation"},'"')]),t(`
  `),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("ak-action-sheet")]),n("span",{class:"token punctuation"},">")]),t(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("template")]),n("span",{class:"token punctuation"},">")]),t(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("script")]),t(),n("span",{class:"token attr-name"},"lang"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("ts"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[t(`
`),n("span",{class:"token keyword"},"import"),t(),n("span",{class:"token punctuation"},"{"),t(" defineComponent"),n("span",{class:"token punctuation"},","),t(" ref "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},"'vue'"),t(`
`),n("span",{class:"token keyword"},"import"),t(),n("span",{class:"token punctuation"},"{"),t(`
  ActionSheetOption`),n("span",{class:"token punctuation"},","),t(`
  ActionSheetOnConfirm`),n("span",{class:"token punctuation"},","),t(`
  showToast`),n("span",{class:"token punctuation"},","),t(`
  showDialog`),n("span",{class:"token punctuation"},","),t(`
  PopupOnCancel`),n("span",{class:"token punctuation"},","),t(`
  showActionSheet`),n("span",{class:"token punctuation"},","),t(`
  PopupOnVisibleStateChange
`),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},"'@/index'"),t(`

`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token literal-property property"},"defaultOptions"),n("span",{class:"token operator"},":"),t(" ActionSheetOption"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token punctuation"},"["),t(`
  `),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u98791'"),t(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u98792'"),t(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u98793'"),t(`
  `),n("span",{class:"token punctuation"},"}"),t(`
`),n("span",{class:"token punctuation"},"]"),t(`

`),n("span",{class:"token keyword"},"export"),t(),n("span",{class:"token keyword"},"default"),t(),n("span",{class:"token function"},"defineComponent"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'ExpActionSheet'"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token function"},"setup"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token keyword"},"const"),t(" visible "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token keyword"},"const"),t(" title "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"''"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token keyword"},"const"),t(" showCancel "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token keyword"},"const"),t(" cancelText "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'\u53D6\u6D88'"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token keyword"},"const"),t(" options "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),t("defaultOptions"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token keyword"},"const"),t(" showEvent "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token keyword"},"const"),t(" visibleEvent "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),t(`

    `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token literal-property property"},"onVisibleStateChange"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token function-variable function"},"PopupOnVisibleStateChange"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token parameter"},"res"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
      `),n("span",{class:"token keyword"},"if"),t(),n("span",{class:"token punctuation"},"("),t("visibleEvent"),n("span",{class:"token punctuation"},"."),t("value"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
        console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'visible-state-change'"),n("span",{class:"token punctuation"},","),t(" res"),n("span",{class:"token punctuation"},")"),t(`
        `),n("span",{class:"token function"},"showToast"),n("span",{class:"token punctuation"},"("),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),t("res"),n("span",{class:"token punctuation"},"."),t("state"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"}," \u4E8B\u4EF6\u89E6\u53D1"),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},")"),t(`
      `),n("span",{class:"token punctuation"},"}"),t(`

      `),n("span",{class:"token keyword"},"if"),t(),n("span",{class:"token punctuation"},"("),t("res"),n("span",{class:"token punctuation"},"."),t("state "),n("span",{class:"token operator"},"==="),t(),n("span",{class:"token string"},"'hidden'"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
        showCancel`),n("span",{class:"token punctuation"},"."),t("value "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token boolean"},"false"),t(`
        cancelText`),n("span",{class:"token punctuation"},"."),t("value "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token string"},"'\u53D6\u6D88'"),t(`
        options`),n("span",{class:"token punctuation"},"."),t("value "),n("span",{class:"token operator"},"="),t(` defaultOptions
        title`),n("span",{class:"token punctuation"},"."),t("value "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token string"},"''"),t(`
        visibleEvent`),n("span",{class:"token punctuation"},"."),t("value "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token boolean"},"false"),t(`
        showEvent`),n("span",{class:"token punctuation"},"."),t("value "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token boolean"},"false"),t(`
      `),n("span",{class:"token punctuation"},"}"),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`

    `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token literal-property property"},"onConfirm"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token function-variable function"},"ActionSheetOnConfirm"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token parameter"},"res"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
      `),n("span",{class:"token keyword"},"if"),t(),n("span",{class:"token punctuation"},"("),t("showEvent"),n("span",{class:"token punctuation"},"."),t("value"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
        console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'confirm'"),n("span",{class:"token punctuation"},","),t(" res"),n("span",{class:"token punctuation"},")"),t(`
        `),n("span",{class:"token function"},"showDialog"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),t(`
          `),n("span",{class:"token literal-property property"},"title"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u62E9\u4E86'"),n("span",{class:"token punctuation"},","),t(`
          `),n("span",{class:"token literal-property property"},"showCancel"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},","),t(`
          `),n("span",{class:"token literal-property property"},"content"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"item.name: '"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),t("res"),n("span",{class:"token punctuation"},"."),t("item"),n("span",{class:"token punctuation"},"."),t("name"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"'\\nindex: "),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),t("res"),n("span",{class:"token punctuation"},"."),t("index"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token template-punctuation string"},"`")]),t(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),t(`
      `),n("span",{class:"token punctuation"},"}"),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`

    `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token literal-property property"},"onCancel"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token function-variable function"},"PopupOnCancel"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token parameter"},"res"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
      `),n("span",{class:"token keyword"},"if"),t(),n("span",{class:"token punctuation"},"("),t("showEvent"),n("span",{class:"token punctuation"},"."),t("value"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
        console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'cancel'"),n("span",{class:"token punctuation"},","),t(" res"),n("span",{class:"token punctuation"},")"),t(`
        `),n("span",{class:"token function"},"showToast"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'\u53D6\u6D88\u4E86'"),n("span",{class:"token punctuation"},")"),t(`
      `),n("span",{class:"token punctuation"},"}"),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`

    `),n("span",{class:"token keyword"},"function"),t(),n("span",{class:"token function"},"onCallApi"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
      `),n("span",{class:"token function"},"showActionSheet"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),t(`
        `),n("span",{class:"token literal-property property"},"title"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u6807\u9898'"),n("span",{class:"token punctuation"},","),t(`
        `),n("span",{class:"token literal-property property"},"options"),n("span",{class:"token operator"},":"),t(" options"),n("span",{class:"token punctuation"},"."),t("value"),n("span",{class:"token punctuation"},","),t(`
        `),n("span",{class:"token literal-property property"},"showCancel"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),t(`
        `),n("span",{class:"token function-variable function"},"success"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token parameter"},"res"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
          console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'success'"),n("span",{class:"token punctuation"},","),t(" res"),n("span",{class:"token punctuation"},")"),t(`
          `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(" confirm"),n("span",{class:"token punctuation"},","),t(" detail "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(` res

          `),n("span",{class:"token keyword"},"if"),t(),n("span",{class:"token punctuation"},"("),t("confirm"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
            `),n("span",{class:"token function"},"showDialog"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),t(`
              `),n("span",{class:"token literal-property property"},"title"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u62E9\u4E86'"),n("span",{class:"token punctuation"},","),t(`
              `),n("span",{class:"token literal-property property"},"showCancel"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},","),t(`
              `),n("span",{class:"token literal-property property"},"content"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"item.name: '"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),t("detail"),n("span",{class:"token punctuation"},"."),t("item"),n("span",{class:"token punctuation"},"."),t("name"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},"'\\nindex: "),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),t("detail"),n("span",{class:"token punctuation"},"."),t("index"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token template-punctuation string"},"`")]),t(`
            `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),t(`
          `),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token keyword"},"else"),t(),n("span",{class:"token punctuation"},"{"),t(`
            `),n("span",{class:"token function"},"showToast"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'\u53D6\u6D88\u4E86'"),n("span",{class:"token punctuation"},")"),t(`
          `),n("span",{class:"token punctuation"},"}"),t(`
        `),n("span",{class:"token punctuation"},"}"),t(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`

    `),n("span",{class:"token keyword"},"return"),t(),n("span",{class:"token punctuation"},"{"),t(`
      visible`),n("span",{class:"token punctuation"},","),t(`
      title`),n("span",{class:"token punctuation"},","),t(`
      showCancel`),n("span",{class:"token punctuation"},","),t(`
      cancelText`),n("span",{class:"token punctuation"},","),t(`
      options`),n("span",{class:"token punctuation"},","),t(`
      `),n("span",{class:"token literal-property property"},"options2"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"["),t(`
        `),n("span",{class:"token punctuation"},"{"),t(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u98791'"),n("span",{class:"token punctuation"},","),t(`
          `),n("span",{class:"token literal-property property"},"description"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u98791\u7684\u63CF\u8FF0\u6587\u6848'"),t(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
        `),n("span",{class:"token punctuation"},"{"),t(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u98792'"),t(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
        `),n("span",{class:"token punctuation"},"{"),t(`
          `),n("span",{class:"token literal-property property"},"name"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},"'\u9009\u98793'"),t(`
        `),n("span",{class:"token punctuation"},"}"),t(`
      `),n("span",{class:"token punctuation"},"]"),t(),n("span",{class:"token keyword"},"as"),t(" ActionSheetOption"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),t(`
      showEvent`),n("span",{class:"token punctuation"},","),t(`
      visibleEvent`),n("span",{class:"token punctuation"},","),t(`

      onVisibleStateChange`),n("span",{class:"token punctuation"},","),t(`
      onConfirm`),n("span",{class:"token punctuation"},","),t(`
      onCancel`),n("span",{class:"token punctuation"},","),t(`
      onCallApi
    `),n("span",{class:"token punctuation"},"}"),t(`
  `),n("span",{class:"token punctuation"},"}"),t(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),t(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("script")]),n("span",{class:"token punctuation"},">")]),t(`
`)])])],-1),d=c(`<h2 id="import" tabindex="-1">Import <a class="header-anchor" href="#import" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AkActionSheet <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;arkui-mobile-vue&#39;</span>
</code></pre></div><p>\u5177\u4F53\u7684\u5F15\u5165\u65B9\u5F0F\u53EF\u4EE5\u53C2\u8003<a href="./../guide/import.html">\u5F15\u5165\u7EC4\u4EF6</a>\u3002</p><h3 id="import-type" tabindex="-1">Import Type <a class="header-anchor" href="#import-type" aria-hidden="true">#</a></h3><p>\u7EC4\u4EF6\u5BFC\u51FA\u7684\u7C7B\u578B\u5B9A\u4E49\uFF1A</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span>
  ActionSheetOption<span class="token punctuation">,</span>
  ActionSheetOnConfirm<span class="token punctuation">,</span>
  VisibleState<span class="token punctuation">,</span>
  PopupOnVisibleStateChange<span class="token punctuation">,</span>
  PopupOnCancel
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;arkui-mobile-vue&#39;</span>
</code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><table><thead><tr><th>\u5C5E\u6027</th><th>\u7C7B\u578B</th><th>\u9ED8\u8BA4\u503C</th><th>\u5FC5\u586B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>v-model:visible</td><td>boolean</td><td>false</td><td>\u5426</td><td>\u662F\u5426\u663E\u793A</td></tr><tr><td>title</td><td>string</td><td></td><td>\u5426</td><td>\u6807\u9898\uFF0C\u4E0D\u8BBE\u7F6E\u5219\u4E0D\u5C55\u793A\u6807\u9898\u680F</td></tr><tr><td>options</td><td>ActionSheetOption[]</td><td></td><td>\u662F</td><td>\u9009\u9879\u5217\u8868</td></tr><tr><td>mask-closable</td><td>boolean</td><td>true</td><td>\u5426</td><td>\u70B9\u51FB\u8499\u5C42\u662F\u5426\u89E6\u53D1\u5173\u95ED\u64CD\u4F5C</td></tr><tr><td>show-cancel</td><td>boolean</td><td>false</td><td>\u5426</td><td>\u662F\u5426\u663E\u793A\u53D6\u6D88\u6309\u94AE</td></tr><tr><td>cancel-text</td><td>string</td><td>&#39;\u53D6\u6D88&#39;</td><td>\u5426</td><td>\u53D6\u6D88\u6309\u94AE\u7684\u6587\u672C</td></tr></tbody></table><h3 id="actionsheetoption-\u7684\u7ED3\u6784" tabindex="-1">ActionSheetOption \u7684\u7ED3\u6784 <a class="header-anchor" href="#actionsheetoption-\u7684\u7ED3\u6784" aria-hidden="true">#</a></h3><table><thead><tr><th>key</th><th>\u7C7B\u578B</th><th>\u9ED8\u8BA4\u503C</th><th>\u5FC5\u586B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>name</td><td>string</td><td></td><td>\u662F</td><td>\u5C55\u793A\u540D\u79F0</td></tr><tr><td>description</td><td>string</td><td></td><td>\u5426</td><td>\u9644\u52A0\u63CF\u8FF0</td></tr><tr><td>disabled</td><td>string</td><td>false</td><td>\u5426</td><td>\u662F\u5426\u7981\u7528</td></tr><tr><td>highlight</td><td>string</td><td>false</td><td>\u5426</td><td>\u662F\u5426\u9AD8\u4EAE\u663E\u793A</td></tr></tbody></table><div class="language-ts"><pre><code><span class="token keyword">interface</span> <span class="token class-name">ActionSheetOption</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  highlight<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  description<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
  disabled<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> options<span class="token operator">:</span> ActionSheetOption<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&#39;\u9009\u98791&#39;</span><span class="token punctuation">,</span>
    disabled<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    description<span class="token operator">:</span> <span class="token string">&#39;\u9009\u9879\u63CF\u8FF0&#39;</span><span class="token punctuation">,</span>
    highlight<span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><table><thead><tr><th>\u4E8B\u4EF6</th><th>\u63CF\u8FF0</th><th>\u56DE\u8C03\u51FD\u6570\u53C2\u6570</th><th>\u51FD\u6570 TypeScript</th></tr></thead><tbody><tr><td>confirm</td><td>\u70B9\u51FB\u9009\u9879\u65F6\u89E6\u53D1</td><td>payload: { item: { name: string }, index: number }</td><td>ActionSheetOnConfirm</td></tr><tr><td>visible-state-change</td><td>\u5C55\u793A\u9690\u85CF\u65F6\u89E6\u53D1</td><td>payload: { state: <a href="./ActionSheet.html#visiblestate-\u503C\u8BF4\u660E">VisibleState</a> }</td><td>PopupOnVisibleStateChange</td></tr><tr><td>cancel</td><td>\u53D6\u6D88\u6309\u94AE\u6216\u8005\u70B9\u51FB\u8499\u5C42\u5173\u95ED\u65F6\u89E6\u53D1</td><td>payload: { source: string }</td><td>PopupOnCancel</td></tr></tbody></table><h3 id="visiblestate-\u503C\u8BF4\u660E" tabindex="-1">VisibleState \u503C\u8BF4\u660E <a class="header-anchor" href="#visiblestate-\u503C\u8BF4\u660E" aria-hidden="true">#</a></h3><table><thead><tr><th>\u503C</th><th>\u8BF4\u660E</th><th>\u5907\u6CE8</th></tr></thead><tbody><tr><td>show</td><td>\u5C55\u793A\u65F6\u89E6\u53D1</td><td></td></tr><tr><td>shown</td><td>\u5C55\u793A\u4E14\u52A8\u753B\u7ED3\u675F\u540E\u89E6\u53D1</td><td></td></tr><tr><td>hide</td><td>\u9690\u85CF\u65F6\u89E6\u53D1</td><td>\u53EF\u80FD\u643A\u5E26\u5176\u4ED6\u53C2\u6570 cancel, maskClick, closeClick \u7B49</td></tr><tr><td>hidden</td><td>\u9690\u85CF\u4E14\u52A8\u753B\u7ED3\u675F\u540E\u89E6\u53D1</td><td>\u53EF\u80FD\u643A\u5E26\u5176\u4ED6\u53C2\u6570 cancel, maskClick, closeClick \u7B49</td></tr></tbody></table><h2 id="showactionsheet-object" tabindex="-1">showActionSheet(object) <a class="header-anchor" href="#showactionsheet-object" aria-hidden="true">#</a></h2><p>\u663E\u793A\u52A8\u4F5C\u9762\u677F\u3002</p><h3 id="object" tabindex="-1">object <a class="header-anchor" href="#object" aria-hidden="true">#</a></h3><table><thead><tr><th>\u5C5E\u6027</th><th>\u7C7B\u578B</th><th>\u9ED8\u8BA4\u503C</th><th>\u5FC5\u586B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>title</td><td>string</td><td></td><td>\u5426</td><td>\u63D0\u793A\u7684\u6807\u9898\uFF0C\u4E0D\u8BBE\u7F6E\u5219\u4E0D\u5C55\u793A</td></tr><tr><td>options</td><td><a href="./ActionSheet.html#actionsheetoption-\u7684\u7ED3\u6784">ActionSheetOption</a>[]</td><td></td><td>\u662F</td><td>\u9009\u9879\u5217\u8868</td></tr><tr><td>showCancel</td><td>boolean</td><td>false</td><td>\u5426</td><td>\u662F\u5426\u663E\u793A\u53D6\u6D88\u6309\u94AE</td></tr><tr><td>cancelText</td><td>string</td><td>&#39;\u53D6\u6D88&#39;</td><td>\u5426</td><td>\u53D6\u6D88\u6309\u94AE\u7684\u6587\u5B57</td></tr><tr><td>success</td><td>(payload: SuccessPayload) =&gt; void</td><td></td><td>\u5426</td><td>\u63A5\u53E3\u8C03\u7528\u6210\u529F\uFF08\u5728\u7528\u6237\u505A\u51FA\u9009\u62E9\u540E\uFF0C\u5982\u53D6\u6D88\uFF0C\u9009\u62E9\u9009\u9879\uFF09\u7684\u56DE\u8C03\u51FD\u6570</td></tr><tr><td>fail</td><td>(e: Error) =&gt; void</td><td></td><td>\u5426</td><td>\u63A5\u53E3\u8C03\u7528\u5931\u8D25\uFF08\u5982\u4F20\u5165\u9519\u8BEF\u7684\u53C2\u6570\uFF09\u7684\u56DE\u8C03\u51FD\u6570\uFF08\u4E0D\u4F20\u5165 fail \u9047\u9519\u8BEF\u76F4\u63A5\u629B\u51FA\uFF09</td></tr><tr><td>complete</td><td>() =&gt; void</td><td></td><td>\u5426</td><td>\u5F39\u7A97\u5173\u95ED\u6216\u8C03\u7528\u5931\u8D25\u7684\u56DE\u8C03\u51FD\u6570</td></tr></tbody></table><h4 id="successpayload" tabindex="-1">SuccessPayload <a class="header-anchor" href="#successpayload" aria-hidden="true">#</a></h4><table><thead><tr><th>\u5C5E\u6027</th><th>\u7C7B\u578B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>confirm?</td><td>boolean</td><td>\u4E3A true \u65F6\uFF0C\u8868\u793A\u7528\u6237\u70B9\u51FB\u4E86\u9009\u9879\uFF0C\u6B64\u65F6\u8FD4\u56DE <code>detail</code></td></tr><tr><td>cancel?</td><td>boolean</td><td>\u4E3A true \u65F6\uFF0C\u8868\u793A\u7528\u6237\u70B9\u51FB\u4E86\u53D6\u6D88</td></tr><tr><td>detail?.item.name</td><td>string</td><td>confirm=true \u65F6\u70B9\u51FB item \u7684\u9009\u9879\u540D</td></tr><tr><td>detail?.index</td><td>number</td><td>confirm=true \u65F6\u70B9\u51FB item \u7684\u7D22\u5F15</td></tr></tbody></table><h3 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h3><p>\u5177\u4F53\u8C03\u7528\u65B9\u5F0F\u53EF\u4EE5\u53C2\u8003<a href="./../guide/import.html#api-\u8C03\u7528">API \u8C03\u7528</a>\u3002</p><div class="language-js"><pre><code><span class="token function">showActionSheet</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;\u6807\u9898&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9009\u98791&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;\u9009\u98791\u7684\u63CF\u8FF0\u6587\u6848&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9009\u98792&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9009\u98793&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">showCancel</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> confirm<span class="token punctuation">,</span> cancel<span class="token punctuation">,</span> detail <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,24);function h(g,m,b,v,y,f){const a=l("CodeDemo");return u(),o("div",null,[k,e(a,{name:"ActionSheet"},{default:p(()=>[r]),_:1}),d])}var S=s(i,[["render",h]]);export{C as __pageData,S as default};
