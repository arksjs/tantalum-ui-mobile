import{d as u,_,c as d,a as e,w as a,F as f,f as t,o as m}from"./index.79461d87.js";const b=u({name:"ExpTabView",setup(){return{onRefreshing:(p,i)=>{setTimeout(()=>{i()},2e3)}}}});function w(o,p,i,x,h,k){const n=t("ak-empty"),l=t("ak-scroll-view"),s=t("ak-tab-view-item"),c=t("ak-tab-view"),r=t("ak-group");return m(),d(f,null,[e(r,{title:"\u57FA\u7840\u7528\u6CD5"},{default:a(()=>[e(c,{class:"exp-tabView"},{default:a(()=>[e(s,{name:"Tab 1"},{default:a(()=>[e(l,{class:"exp-tabView-scroll-view","enable-pull-directions":["down"],"scroll-y":"","scroll-x":"",onRefreshing:o.onRefreshing},{default:a(()=>[e(n,{class:"exp-tabView-empty",description:"Tab 1 \u4E0B\u62C9\u5237\u65B0"})]),_:1},8,["onRefreshing"])]),_:1}),e(s,{name:"Tab 2"},{default:a(()=>[e(n,{class:"exp-tabView-empty",description:"Tab 2"})]),_:1})]),_:1})]),_:1}),e(r,{title:"\u5782\u76F4"},{default:a(()=>[e(c,{class:"exp-tabView",initialVertical:!0,scrollThreshold:1},{default:a(()=>[e(s,{name:"Tab 1"},{default:a(()=>[e(l,{class:"exp-tabView-scroll-view","enable-pull-directions":["down"],"scroll-y":"",onRefreshing:o.onRefreshing},{default:a(()=>[e(n,{class:"exp-tabView-empty",description:"Tab 1 \u4E0B\u62C9\u5237\u65B0"})]),_:1},8,["onRefreshing"])]),_:1}),e(s,{name:"Tab 2"},{default:a(()=>[e(n,{class:"exp-tabView-empty",description:"Tab 2"})]),_:1})]),_:1})]),_:1})],64)}const T=_(b,[["render",w]]);export{T as default};
