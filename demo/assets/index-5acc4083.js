import{d as h,s as t,_ as i,c as F,a as e,w as a,F as f,f as c,o as C}from"./index-1677cc26.js";const B=["冰箱","洗衣机","净化器"],E=h({name:"ExpSearchBar",setup(){const o=()=>{t("取消按钮点击")},s=(n,l)=>{l(n?"ABCD".split("").map(u=>({text:`${n} ${u}`,tags:["tag1","tag2"]})):[])};return{placeholders:B,onFocus:()=>t("focus"),onBlur:()=>t("blur"),onCancel:o,onInput:s,onInput2:(n,l)=>{t(`输入了 ${n}`),s(n,l)},onSearch:n=>{console.log("search",n),t(`搜索了 ${n.text}`)},onClick:n=>{console.log("field-click",n),t(`搜索词 ${n.text}`)}}}});function _(o,s,r,p,d,n){const l=c("ta-search-bar"),u=c("ta-group");return C(),F(f,null,[e(u,{title:"基础用法"},{default:a(()=>[e(l)]),_:1}),e(u,{title:"搜索建议"},{default:a(()=>[e(l,{onInput:o.onInput},null,8,["onInput"])]),_:1}),e(u,{title:"显示取消按钮"},{default:a(()=>[e(l,{"show-cancel":""})]),_:1}),e(u,{title:"设置候选项"},{default:a(()=>[e(l,{placeholders:o.placeholders},null,8,["placeholders"])]),_:1}),e(u,{title:"深色适配"},{default:a(()=>[e(l,{class:"exp-searchBar-dark-style","show-cancel":"",ghost:""})]),_:1}),e(u,{title:"只读（readonly=true）"},{default:a(()=>[e(l,{readonly:"",placeholders:o.placeholders},null,8,["placeholders"])]),_:1}),e(u,{title:"事件监听"},{default:a(()=>[e(l,{"show-cancel":"",placeholders:o.placeholders,onInput:o.onInput2,onFocus:o.onFocus,onBlur:o.onBlur,onCancel:o.onCancel,onSearch:o.onSearch},null,8,["placeholders","onInput","onFocus","onBlur","onCancel","onSearch"])]),_:1}),e(u,{title:"事件监听（readonly=true）"},{default:a(()=>[e(l,{readonly:"",placeholders:o.placeholders,onFieldClick:o.onClick},null,8,["placeholders","onFieldClick"])]),_:1})],64)}const g=i(E,[["render",_]]);export{g as default};