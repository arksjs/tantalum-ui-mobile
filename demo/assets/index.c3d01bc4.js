import{d as b,r as i,s as c,_ as f,c as C,a as n,w as d,F as g,f as a,o as m}from"./index.71cc4ec9.js";const E=b({name:"ExpDropdown",setup(){const e=i(!1),o=i(""),t=i(!1);return{visible:e,selector:o,visibleEvent:t,onVisibleStateChange:({state:l})=>{t.value&&(c(`${l} \u4E8B\u4EF6\u89E6\u53D1`),console.log("visible-state-change",l)),l==="hidden"&&(t.value=!1)}}}});function w(e,o,t,p,l,$){const r=a("ta-cell"),u=a("ta-group"),v=a("ta-dropdown");return m(),C(g,null,[n(u,{title:"\u57FA\u7840\u7528\u6CD5"},{default:d(()=>[n(r,{label:"\u57FA\u7840",isLink:"",id:"dropdownCell",onClick:o[0]||(o[0]=s=>{e.selector="#dropdownCell",e.visible=!0})})]),_:1}),n(u,{title:"\u4E8B\u4EF6\u76D1\u542C"},{default:d(()=>[n(r,{label:"visible-state-change",id:"dropdownCellEvent",onClick:o[1]||(o[1]=s=>{e.selector="#dropdownCellEvent",e.visibleEvent=!0,e.visible=!0})})]),_:1}),n(v,{visible:e.visible,"onUpdate:visible":o[2]||(o[2]=s=>e.visible=s),selector:e.selector,onVisibleStateChange:e.onVisibleStateChange},null,8,["visible","selector","onVisibleStateChange"])],64)}const V=f(E,[["render",w]]);export{V as default};
