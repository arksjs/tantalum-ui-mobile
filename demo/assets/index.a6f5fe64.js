import{d as B,r as n,c as _,a as l,w as k,F as D,k as o,f as c,o as F}from"./index.95fccdd4.js";const L=B({setup(A){const p=n(""),t=n(!1),a=n(!1),r=n(!1),v=n(!1),E=e=>{v.value&&(console.log("visible-state-change",e),o(`${e.state} \u4E8B\u4EF6\u89E6\u53D1`)),e.state==="hidden"&&(a.value=!1,v.value=!1,r.value=!1)};function m(e){r.value&&(console.log("change",e),o(`\u503C\u6539\u4E3A ${e}`))}const C=e=>{a.value&&(console.log("confirm",e),o("\u70B9\u51FB\u786E\u5B9A\u6309\u94AE"))},d=e=>{a.value&&(console.log("cancel",e),e.source==="cancelClick"?o("\u70B9\u51FB\u4E86\u53D6\u6D88\u6309\u94AE"):e.source==="maskClick"&&o("\u70B9\u51FB\u4E86\u8499\u5C42"))};return(e,u)=>{const b=c("ak-notice-bar"),i=c("ak-cell"),f=c("ak-group"),g=c("ak-date-picker-popup");return F(),_(D,null,[l(b,{class:"top-notice-bar",title:"\u57FA\u7840\u5C55\u793A\u53C2\u6570\u53EF\u4EE5\u53C2\u8003 DatePicker"}),l(f,{title:"\u57FA\u7840\u7528\u6CD5"},{default:k(()=>[l(i,{label:"\u9ED8\u8BA4",isLink:"",onClick:u[0]||(u[0]=s=>t.value=!0),content:p.value},null,8,["content"])]),_:1}),l(f,{title:"\u4E8B\u4EF6\u76D1\u542C"},{default:k(()=>[l(i,{label:"change",isLink:"",onClick:u[1]||(u[1]=()=>{r.value=!0,t.value=!0})}),l(i,{label:"confirm/cancel",isLink:"",onClick:u[2]||(u[2]=()=>{a.value=!0,t.value=!0})}),l(i,{label:"visible-state-change",isLink:"",onClick:u[3]||(u[3]=()=>{v.value=!0,t.value=!0})})]),_:1}),l(g,{initialMode:"date",formatTemplate:"YYYY\u5E74MM\u6708DD\u65E5",visible:t.value,"onUpdate:visible":u[4]||(u[4]=s=>t.value=s),title:"DatePickerPopup",modelValue:p.value,"onUpdate:modelValue":u[5]||(u[5]=s=>p.value=s),onChange:m,onConfirm:C,onCancel:d,onVisibleStateChange:E},null,8,["visible","modelValue"])],64)}}});export{L as default};