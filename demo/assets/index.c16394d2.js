import{_ as u,d,r as _,c as g,a as e,w as r,F as f,f as c,o as m,l as a,i as s,t as k}from"./index.e0cc1ed4.js";const h=d({name:"ExpCircleProgress",setup(){return{percentage:_(50)}}}),x={class:"exp-circleProgress-box"},C={class:"exp-circleProgress-list"},V=s(" color "),B=s(" strokeWidth "),F=s(" size "),v={class:"exp-circleProgress-box"};function E(t,p,P,$,D,N){const o=c("ak-circle-progress"),i=c("ak-stepper"),n=c("ak-group");return m(),g(f,null,[e(n,{title:"\u57FA\u7840\u7528\u6CD5"},{default:r(()=>[a("div",x,[e(o,{percentage:t.percentage},null,8,["percentage"]),e(i,{min:0,max:100,modelValue:t.percentage,"onUpdate:modelValue":p[0]||(p[0]=l=>t.percentage=l)},null,8,["modelValue"])])]),_:1}),e(n,{title:"\u53C2\u6570\u8BBE\u7F6E"},{default:r(()=>[a("ul",C,[a("li",null,[e(o,{percentage:t.percentage,color:"#ff4d4f"},{default:r(()=>[V]),_:1},8,["percentage"])]),a("li",null,[e(o,{percentage:t.percentage,strokeWidth:2},{default:r(()=>[B]),_:1},8,["percentage"])]),a("li",null,[e(o,{percentage:t.percentage,size:80},{default:r(()=>[F]),_:1},8,["percentage"])])])]),_:1}),e(n,{title:"Slot default"},{default:r(()=>[a("div",v,[e(o,{percentage:t.percentage},{default:r(({progress:l})=>[s(" \u5DF2\u62A2"+k(l),1)]),_:1},8,["percentage"])])]),_:1})],64)}var w=u(h,[["render",E]]);export{w as default};
