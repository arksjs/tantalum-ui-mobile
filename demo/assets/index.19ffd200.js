import{_ as m,d as w,r as u,c as k,a as n,w as i,F as E,s as b,f as v,o as f}from"./index.e0cc1ed4.js";const A=w({name:"ExpDrawer",setup(){const t=u(!1),e=u(""),a=u("top"),r=u(!1),p=u(!1),C=u(!1);function o(l){e.value=l.title||"",a.value=l.placement||"top",r.value=l.showClose||!1,p.value=!!l.visibleEvent,C.value=!!l.cancelEvent,t.value=!0}return{drawerVisible:t,title:e,placement:a,showClose:r,show:o,onVisibleStateChange:({state:l})=>{p.value&&(b(`${l} \u4E8B\u4EF6\u89E6\u53D1`),console.log("visible-state-change",l))},onCancel:l=>{C.value&&(b("\u53D6\u6D88"),console.log("cancel",l))}}}});function d(t,e,a,r,p,C){const o=v("ak-cell"),s=v("ak-group"),F=v("ak-drawer");return f(),k(E,null,[n(s,{title:"\u57FA\u7840\u7528\u6CD5"},{default:i(()=>[n(o,{label:"\u9876\u90E8\u5F39\u51FA",isLink:"",onClick:e[0]||(e[0]=l=>t.show({title:"\u9876\u90E8\u5F39\u51FA",placement:"top"}))}),n(o,{label:"\u5E95\u90E8\u5F39\u51FA",isLink:"",onClick:e[1]||(e[1]=l=>t.show({title:"\u5E95\u90E8\u5F39\u51FA",placement:"bottom"}))}),n(o,{label:"\u5DE6\u4FA7\u5F39\u51FA",isLink:"",onClick:e[2]||(e[2]=l=>t.show({title:"\u5DE6\u4FA7\u5F39\u51FA",placement:"left"}))}),n(o,{label:"\u53F3\u4FA7\u5F39\u51FA",isLink:"",onClick:e[3]||(e[3]=l=>t.show({title:"\u53F3\u4FA7\u5F39\u51FA",placement:"right"}))})]),_:1}),n(s,{title:"\u65E0\u6807\u9898"},{default:i(()=>[n(o,{label:"\u5E95\u90E8\u5F39\u51FA",isLink:"",onClick:e[4]||(e[4]=l=>t.show({placement:"bottom"}))}),n(o,{label:"\u53F3\u4FA7\u5F39\u51FA",isLink:"",onClick:e[5]||(e[5]=l=>t.show({placement:"right"}))})]),_:1}),n(s,{title:"\u5C55\u793A\u5173\u95ED\u6309\u94AE"},{default:i(()=>[n(o,{label:"\u6709\u6807\u9898-\u5E95\u90E8",isLink:"",onClick:e[6]||(e[6]=l=>t.show({title:"\u6807\u9898",placement:"bottom",showClose:!0}))}),n(o,{label:"\u6709\u6807\u9898-\u53F3\u4FA7",isLink:"",onClick:e[7]||(e[7]=l=>t.show({title:"\u6807\u9898",placement:"right",showClose:!0}))}),n(o,{label:"\u65E0\u6807\u9898",isLink:"",onClick:e[8]||(e[8]=l=>t.show({placement:"bottom",showClose:!0}))})]),_:1}),n(s,{title:"\u4E8B\u4EF6\u76D1\u542C"},{default:i(()=>[n(o,{label:"visible-state-change",isLink:"",onClick:e[9]||(e[9]=l=>t.show({title:"\u6807\u9898",placement:"bottom",showClose:!0,visibleEvent:!0}))}),n(o,{label:"cancel",isLink:"",onClick:e[10]||(e[10]=l=>t.show({title:"\u6807\u9898",placement:"bottom",showClose:!0,cancelEvent:!0}))})]),_:1}),n(F,{visible:t.drawerVisible,"onUpdate:visible":e[11]||(e[11]=l=>t.drawerVisible=l),title:t.title,placement:t.placement,showClose:t.showClose,onVisibleStateChange:t.onVisibleStateChange,onCancel:t.onCancel},null,8,["visible","title","placement","showClose","onVisibleStateChange","onCancel"])],64)}var g=m(A,[["render",d]]);export{g as default};
