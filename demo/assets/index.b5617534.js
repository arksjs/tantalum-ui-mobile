import{d as l,s as r,_ as i,c as f,a as e,w as t,F as m,f as u,o as x,p,i as _}from"./index.95e2279c.js";const y=l({name:"ExpCopy",setup(){return{onSuccess:o=>{r({title:`${o}`,type:"success"})},onError:o=>{r({title:o.message,type:"fail"})}}}}),C={class:"exp-copy-pad"},E=_("\u70B9\u51FB\u590D\u5236"),B={class:"exp-copy-pad"},h=_("\u70B9\u51FB\u590D\u5236");function D(s,d,o,F,S,$){const a=u("ta-button"),c=u("ta-copy"),n=u("ta-group");return x(),f(m,null,[e(n,{title:"\u57FA\u672C\u7528\u6CD5"},{default:t(()=>[p("div",C,[e(c,{class:"exp-copy-box",text:"\u590D\u5236\u7684\u6587\u672C"},{default:t(()=>[e(a,{type:"primary"},{default:t(()=>[E]),_:1})]),_:1})])]),_:1}),e(n,{title:"\u4E8B\u4EF6\u76D1\u542C"},{default:t(()=>[p("div",B,[e(c,{class:"exp-copy-box",text:"\u590D\u5236\u7684\u6587\u672C2",onSuccess:s.onSuccess,onError:s.onError},{default:t(()=>[e(a,{type:"primary"},{default:t(()=>[h]),_:1})]),_:1},8,["onSuccess","onError"])])]),_:1})],64)}const g=i(y,[["render",D]]);export{g as default};