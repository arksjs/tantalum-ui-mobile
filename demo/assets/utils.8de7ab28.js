import{aa as e}from"./index.64ffe480.js";const a="YYYY\u5E74MM\u6708DD\u65E5",m=(t,n)=>{const r=t.length===0?"":n==="range"?t.map(o=>e(o).format(a)).join(" ~ "):e(t[0]).format(a);return{value:r,label:r}},p=(t,n)=>n==="range"?t?t.split(" ~ ").map(r=>e(r,a,!0).toDate()):[]:t?[e(t,a,!0).toDate()]:[];export{m as f,p,a as t};
