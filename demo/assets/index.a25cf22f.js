import{d as g,r as m,c as w,a as e,w as a,F as C,f as l,o as E,i as p,t as _,u as o,s as F}from"./index.6c1df670.js";import{f,p as v}from"./utils.8fe364ce.js";const b={name:"ExpCalendarView"},M=g({...b,setup(x){const n=m(""),r=m(""),V=u=>{console.log("select",u),F(`\u9009\u62E9\uFF1A${u.label}`)};return(u,t)=>{const k=l("ak-notice-bar"),c=l("ak-cell"),s=l("ak-calendar-view"),i=l("ak-group");return E(),w(C,null,[e(k,{class:"top-notice-bar",title:"\u57FA\u7840\u5C55\u793A\u53C2\u6570\u53EF\u4EE5\u53C2\u8003 Calendar"}),e(i,{title:"initialMode=single"},{default:a(()=>[e(c,{label:"v-model"},{default:a(()=>[p(_(n.value),1)]),_:1}),e(s,{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=d=>n.value=d),formatter:o(f),parser:o(v)},null,8,["modelValue","formatter","parser"])]),_:1}),e(i,{title:"initialMode=range"},{default:a(()=>[e(c,{label:"v-model"},{default:a(()=>[p(_(r.value),1)]),_:1}),e(s,{initialMode:"range",modelValue:r.value,"onUpdate:modelValue":t[1]||(t[1]=d=>r.value=d),formatter:o(f),parser:o(v)},null,8,["modelValue","formatter","parser"])]),_:1}),e(i,{title:"select \u4E8B\u4EF6"},{default:a(()=>[e(s,{onSelect:V})]),_:1})],64)}}});export{M as default};
