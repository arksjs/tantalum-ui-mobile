import{_ as h,d as i,r as F,c as B,a as e,w as u,F as C,s as _,f as n,o as f,i as c}from"./index.e0cc1ed4.js";const m=i({name:"ExpInput",setup(){const a=F(""),d=F("");function r(s){_(`\u5F53\u524D\u503C\u4E3A\uFF1A${s}`)}return{value:a,changeValue:d,onInput:r}}}),y=c("https://"),x=c(".com");function b(a,d,r,s,E,V){const t=n("ak-input"),o=n("ak-group"),l=n("ak-cell");return f(),B(C,null,[e(o,{title:"\u57FA\u7840\u7528\u6CD5"},{default:u(()=>[e(t,{type:"text",focus:"",placeholder:"\u8BF7\u8F93\u5165\u6587\u672C"}),e(t,{type:"text",modelValue:"\u7981\u7528",disabled:""}),e(t,{type:"text",placeholder:"showLimit=true",showLimit:"",showClear:""})]),_:1}),e(o,{title:"textarea"},{default:u(()=>[e(t,{type:"textarea",placeholder:"showLimit=true",showLimit:"",maxlength:"200"})]),_:1}),e(o,{title:"Slot prepend/append"},{default:u(()=>[e(t,{type:"text",focus:"",placeholder:"\u8BF7\u8F93\u5165\u7F51\u5740"},{prepend:u(()=>[y]),_:1}),e(t,{type:"text",focus:"",placeholder:"\u8BF7\u8F93\u5165\u7F51\u5740"},{append:u(()=>[x]),_:1})]),_:1}),e(o,{title:"\u4E0E Cell \u7EC4\u5408"},{default:u(()=>[e(l,{label:"\u6587\u672C"},{default:u(()=>[e(t,{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6587\u672C"})]),_:1})]),_:1}),e(o,{title:"\u8BBE\u7F6E type \u7C7B\u578B"},{default:u(()=>[e(l,{label:"\u6587\u672C text"},{default:u(()=>[e(t,{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6587\u672C"})]),_:1}),e(l,{label:"\u7535\u8BDD tel"},{default:u(()=>[e(t,{type:"tel",placeholder:"\u8BF7\u8F93\u5165\u7535\u8BDD"})]),_:1}),e(l,{label:"\u6574\u6570 digit"},{default:u(()=>[e(t,{type:"digit",placeholder:"\u8BF7\u8F93\u5165\u6574\u6570"})]),_:1}),e(l,{label:"\u6570\u5B57 number"},{default:u(()=>[e(t,{type:"number",placeholder:"\u8BF7\u8F93\u5165\u6570\u5B57"})]),_:1}),e(l,{label:"\u641C\u7D22 search"},{default:u(()=>[e(t,{type:"search",placeholder:"\u8BF7\u8F93\u5165\u8981\u641C\u7D22\u7684\u5185\u5BB9"})]),_:1}),e(l,{label:"\u5BC6\u7801 password"},{default:u(()=>[e(t,{type:"password",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801"})]),_:1}),e(l,{label:"\u6587\u672C textarea"},{default:u(()=>[e(t,{type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u591A\u884C\u6587\u672C"})]),_:1})]),_:1}),e(o,{title:"\u5176\u4ED6"},{default:u(()=>[e(l,{label:"\u53EA\u8BFB readonly"},{default:u(()=>[e(t,{type:"text",modelValue:"\u53EA\u8BFB\u6587\u672C",readonly:""})]),_:1}),e(l,{label:"\u7981\u7528 disabled"},{default:u(()=>[e(t,{type:"text",modelValue:"\u7981\u7528\u6587\u672C",disabled:""})]),_:1}),e(l,{label:"\u53EF\u6E05\u9664 showClear"},{default:u(()=>[e(t,{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6587\u672C",modelValue:"\u6587\u672C\u5185\u5BB9",showClear:""})]),_:1})]),_:1}),e(o,{title:"\u4E8B\u4EF6\u76D1\u542C"},{default:u(()=>[e(l,{label:"input"},{default:u(()=>[e(t,{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6587\u672C",showClear:"",modelValue:a.value,"onUpdate:modelValue":d[0]||(d[0]=p=>a.value=p),onInput:a.onInput},null,8,["modelValue","onInput"])]),_:1}),e(l,{label:"change"},{default:u(()=>[e(t,{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6587\u672C",showClear:"",modelValue:a.changeValue,"onUpdate:modelValue":d[1]||(d[1]=p=>a.changeValue=p),onChange:a.onInput},null,8,["modelValue","onChange"])]),_:1})]),_:1})],64)}var g=h(m,[["render",b]]);export{g as default};
