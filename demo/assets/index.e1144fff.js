import{_ as m,d as r,a6 as u,c as s,a as e,w as t,F as _,f as o,o as c}from"./index.e0cc1ed4.js";const p=r({name:"ExpTimeAgo",data(){return{time:new Date,time2:u("2021-05-01","YYYY-MM-DD").toDate(),interval:2}}});function d(a,f,k,v,g,D){const n=o("ak-time-ago"),l=o("ak-cell"),i=o("ak-group");return c(),s(_,null,[e(i,{title:"\u57FA\u7840\u7528\u6CD5"},{default:t(()=>[e(l,{label:"\u5F53\u524D"},{default:t(()=>[e(n,{time:a.time},null,8,["time"])]),_:1}),e(l,{label:"2021-05-01"},{default:t(()=>[e(n,{time:a.time2},null,8,["time"])]),_:1})]),_:1}),e(i,{title:"\u95F4\u9694"},{default:t(()=>[e(l,{label:"interval=2"},{default:t(()=>[e(n,{time:a.time,interval:a.interval},null,8,["time","interval"])]),_:1})]),_:1})],64)}var C=m(p,[["render",d]]);export{C as default};
