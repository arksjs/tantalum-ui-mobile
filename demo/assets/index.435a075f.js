import{d as F,r as s,c as g,a as e,w as n,F as v,f as c,o as C,u as p,s as _}from"./index.71cc4ec9.js";import{c as d}from"./data.b56da698.js";const B={name:"ExpCascaderView"},b=F({...B,setup(w){const i=s([]),r=s([]),m=s([]);function f(o){console.log("change",o),_(`change: ${o}`)}const V=o=>{console.log("select",o),_(`select: ${o.value}`)};return(o,u)=>{const E=c("ta-notice-bar"),a=c("ta-cascader-view"),l=c("ta-group");return C(),g(v,null,[e(E,{class:"top-notice-bar",title:"\u57FA\u7840\u5C55\u793A\u53C2\u6570\u53EF\u4EE5\u53C2\u8003 Cascader"}),e(l,{title:"\u5BB6\u7535"},{default:n(()=>[e(a,{options:p(d),modelValue:m.value,"onUpdate:modelValue":u[0]||(u[0]=t=>m.value=t)},null,8,["options","modelValue"])]),_:1}),e(l,{title:"\u7A7A\u6570\u636E"},{default:n(()=>[e(a,{options:[]})]),_:1}),e(l,{title:"change \u4E8B\u4EF6"},{default:n(()=>[e(a,{options:p(d),onChange:f,modelValue:i.value,"onUpdate:modelValue":u[1]||(u[1]=t=>i.value=t)},null,8,["options","modelValue"])]),_:1}),e(l,{title:"select \u4E8B\u4EF6\uFF08\u8DDF change \u7684\u533A\u522B\u662F\u91CD\u590D\u9009\u4E00\u6837\u7684\u4E5F\u89E6\u53D1\uFF09"},{default:n(()=>[e(a,{options:p(d),onSelect:V,modelValue:r.value,"onUpdate:modelValue":u[2]||(u[2]=t=>r.value=t)},null,8,["options","modelValue"])]),_:1})],64)}}});export{b as default};
