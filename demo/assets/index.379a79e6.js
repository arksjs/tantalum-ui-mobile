import{_ as k,d as m,r as p,a1 as b,c as v,a as o,w as r,a2 as d,F as w,Y as F,s as B,f as c,o as $}from"./index.64ffe480.js";const L=m({name:"ExpDialog",setup(e,u){const a=p(!1);let s=!1,D=!1;const A=b({title:"",content:"",cancelText:"",confirmText:"",showCancel:!1});function l(n,E,g){n=Object.assign({title:"",content:"",showCancel:!0,cancelText:"\u53D6\u6D88",confirmText:"\u786E\u5B9A"},n);for(let f in n)A[f]=n[f];s=!!E,D=!!g,a.value=!0}function i(){F({title:"\u6807\u9898",content:"\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9",maskClosable:!0,success:n=>{console.log("success",n),B(n.confirm?"confirm = true":"cancel = true")}})}return{visible:a,dialogArgs:A,show:l,onCallApi:i,onConfirm:n=>{console.log("confirm",n),s&&B("\u70B9\u51FB\u786E\u5B9A\u6309\u94AE")},onCancel:n=>{console.log("cancel",n),s&&B("\u70B9\u51FB\u53D6\u6D88\u6309\u94AE")},onVisibleStateChange:({state:n})=>{D&&(console.log("visible-state-change",n),B(`${n} \u4E8B\u4EF6\u89E6\u53D1`))}}}});function T(e,u,a,s,D,A){const l=c("ak-cell"),i=c("ak-group"),C=c("ak-dialog");return $(),v(w,null,[o(i,{title:"\u57FA\u7840\u7528\u6CD5"},{default:r(()=>[o(l,{label:"\u9ED8\u8BA4",isLink:"",onClick:u[0]||(u[0]=t=>e.show({title:"\u6807\u9898",content:"\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9"}))}),o(l,{label:"\u4E0D\u5E26\u6807\u9898",isLink:"",onClick:u[1]||(u[1]=t=>e.show({content:"\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9"}))}),o(l,{label:"\u4E0D\u663E\u793A\u53D6\u6D88\u6309\u94AE",isLink:"",onClick:u[2]||(u[2]=t=>e.show({title:"\u6807\u9898",content:"\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9",showCancel:!1}))}),o(l,{label:"\u81EA\u5B9A\u4E49\u6309\u94AE\u6587\u6848",isLink:"",onClick:u[3]||(u[3]=t=>e.show({title:"\u60CA\u559C",content:"\u8FD9\u6709\u4E00\u4EFD\u5173\u7231\u4FDD\u9669\u5F85\u4F60\u67E5\u6536",cancelText:"\u62D2\u7EDD",confirmText:"\u63A5\u53D7"}))})]),_:1}),o(i,{title:"\u4E8B\u4EF6\u76D1\u542C"},{default:r(()=>[o(l,{label:"confirm/cancel",isLink:"",onClick:u[4]||(u[4]=t=>e.show({title:"\u6807\u9898",content:"\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9"},!0))}),o(l,{label:"visible-state-change",isLink:"",onClick:u[5]||(u[5]=t=>e.show({title:"\u6807\u9898",content:"\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9\u63D0\u793A\u5185\u5BB9"},!1,!0))})]),_:1}),o(i,{title:"API"},{default:r(()=>[o(l,{label:"showDialog",isLink:"",onClick:u[6]||(u[6]=t=>e.onCallApi())})]),_:1}),o(C,d({visible:e.visible,"onUpdate:visible":u[7]||(u[7]=t=>e.visible=t)},e.dialogArgs,{onConfirm:e.onConfirm,onCancel:e.onCancel,onVisibleStateChange:e.onVisibleStateChange}),null,16,["visible","onConfirm","onCancel","onVisibleStateChange"])],64)}const S=k(L,[["render",T]]);export{S as default};
