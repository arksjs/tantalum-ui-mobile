import{o as C,m as r,c as A}from"./data.b56da698.js";import{d as w,r as c,c as E,a as o,w as l,F as h,f as d,o as F,u,a4 as P,k}from"./index.95fccdd4.js";import{r as x}from"./region.fcb5302d.js";const N=w({setup(D){const m=c([]),b=c([2e3,"\u6625"]),i="-",f=c(`2001${i}\u590F`),V=(e,t)=>({value:e.join(i),label:t.join(i)}),g=e=>e?e.split(i):[];function v(){P({title:"Picker",options:r}).then(e=>{console.log("success",e),e.cancel?k("\u53D6\u6D88\u4E86"):k(`\u9009\u62E9\u4E86 ${e.detail.label}`)})}function s(e){console.log("change",e)}return(e,t)=>{const n=d("ak-picker"),a=d("ak-cell"),_=d("ak-group");return F(),E(h,null,[o(_,{title:"\u57FA\u7840\u7528\u6CD5"},{default:l(()=>[o(a,{label:"\u5355\u5217"},{default:l(()=>[o(n,{options:u(C),onChange:s},null,8,["options"])]),_:1}),o(a,{label:"\u591A\u5217"},{default:l(()=>[o(n,{options:u(r),onChange:s},null,8,["options"])]),_:1}),o(a,{label:"\u7EA7\u8054"},{default:l(()=>[o(n,{options:u(A),onChange:s},null,8,["options"])]),_:1}),o(a,{label:"\u5730\u533A"},{default:l(()=>[o(n,{options:u(x),fieldNames:{value:"label"},modelValue:m.value,"onUpdate:modelValue":t[0]||(t[0]=p=>m.value=p),onChange:s},null,8,["options","modelValue"])]),_:1}),o(a,{label:"formatter/parser"},{default:l(()=>[o(n,{modelValue:f.value,"onUpdate:modelValue":t[1]||(t[1]=p=>f.value=p),formatter:V,parser:g,options:u(r),onChange:s},null,8,["modelValue","options"])]),_:1}),o(a,{label:"\u7981\u7528"},{default:l(()=>[o(n,{modelValue:b.value,options:u(r),disabled:""},null,8,["modelValue","options"])]),_:1})]),_:1}),o(_,{title:"API"},{default:l(()=>[o(a,{label:"showPicker",isLink:"",onClick:v})]),_:1})],64)}}});export{N as default};