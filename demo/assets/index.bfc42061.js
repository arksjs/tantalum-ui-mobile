import{s as c,t as d,m as b,a as v}from"./data.8955d599.js";import{_ as h,d as _,r as p,c as f,a,w as n,F as m,s as V,f as r,o as g,l as i}from"./index.e0cc1ed4.js";const C=_({name:"ExpTab",setup(){const t=(e,u)=>{console.log("change",{value:e,index:u}),V(`\u5207\u6362\u5230\u7B2C${u+1}\u4E2A`)};return{shortActiveValue:p(1),activeValue:p(1),shortTabList:c,tabList:d,mixTabList:b,subTabList:v,onChange:t}}}),T={class:"exp-tab-box"},F={class:"exp-tab-box"},L={class:"exp-tab-box"},x={class:"exp-tab-box"},E={class:"exp-tab-box"};function A(t,e,u,k,B,$){const o=r("ak-tab"),s=r("ak-group");return g(),f(m,null,[a(s,{title:"\u57FA\u7840\u7528\u6CD5"},{default:n(()=>[i("div",T,[a(o,{options:t.shortTabList,activeValue:t.shortActiveValue,"onUpdate:activeValue":e[0]||(e[0]=l=>t.shortActiveValue=l)},null,8,["options","activeValue"])])]),_:1}),a(s,{title:"\u6EDA\u52A8\uFF08\u9608\u503C scrollThreshold = 4\uFF09"},{default:n(()=>[i("div",F,[a(o,{options:t.tabList,activeValue:t.activeValue,"onUpdate:activeValue":e[1]||(e[1]=l=>t.activeValue=l)},null,8,["options","activeValue"])])]),_:1}),a(s,{title:"Mix"},{default:n(()=>[i("div",L,[a(o,{options:t.mixTabList},null,8,["options"])])]),_:1}),a(s,{title:"\u5E26\u526F\u6807\u7B7E"},{default:n(()=>[i("div",x,[a(o,{options:t.subTabList},null,8,["options"])])]),_:1}),a(s,{title:"change \u4E8B\u4EF6"},{default:n(()=>[i("div",E,[a(o,{options:t.shortTabList,onChange:t.onChange},null,8,["options","onChange"])])]),_:1})],64)}var N=h(C,[["render",A]]);export{N as default};
