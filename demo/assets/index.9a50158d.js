import{d as v,r as s,c as g,a as e,w as i,F as C,f as m,o as E,u as p,s as w}from"./index.6c1df670.js";import{o as F,m as _,c as x}from"./data.b56da698.js";const A={name:"ExpPickerView"},h=v({...A,setup(U){const d=s([2001]),c=s([]),r=s([]),V=s([]);function l(t){console.log("change",t)}function f(t){l(t),w(`change: ${t}`)}return(t,o)=>{const k=m("ak-notice-bar"),n=m("ak-picker-view"),u=m("ak-group");return E(),g(C,null,[e(k,{class:"top-notice-bar",title:"\u57FA\u7840\u5C55\u793A\u53C2\u6570\u53EF\u4EE5\u53C2\u8003 Picker"}),e(u,{title:"\u5355\u5217"},{default:i(()=>[e(n,{options:p(F),onChange:l,modelValue:d.value,"onUpdate:modelValue":o[0]||(o[0]=a=>d.value=a)},null,8,["options","modelValue"])]),_:1}),e(u,{title:"\u591A\u5217"},{default:i(()=>[e(n,{options:p(_),onChange:l,modelValue:c.value,"onUpdate:modelValue":o[1]||(o[1]=a=>c.value=a)},null,8,["options","modelValue"])]),_:1}),e(u,{title:"\u7EA7\u8054"},{default:i(()=>[e(n,{options:p(x),onChange:l,modelValue:r.value,"onUpdate:modelValue":o[2]||(o[2]=a=>r.value=a)},null,8,["options","modelValue"])]),_:1}),e(u,{title:"change \u4E8B\u4EF6"},{default:i(()=>[e(n,{options:p(_),onChange:f,modelValue:V.value,"onUpdate:modelValue":o[3]||(o[3]=a=>V.value=a)},null,8,["options","modelValue"])]),_:1})],64)}}});export{h as default};
