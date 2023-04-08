import{d as b,r as c,b as w,w as a,f as s,o as f,a as l,c as B,p as x,t as E,u as k,s as N,e as q,i as v,j as D}from"./index.daf35228.js";import{s as T}from"./index.0926b612.js";const U=v("\u751F\u6210\u4E3B\u9898"),F={key:0,class:"exp-customTheme-code"},j=v("\u590D\u5236\u4EE3\u7801 "),z=b({setup(S){function d(e,t,n=!0){const o=D(t),u=n?"":" !default";return`
$${e}-color-1: ${o[0]}${u};
$${e}-color-2: ${o[1]}${u};
$${e}-color-3: ${o[2]}${u};
$${e}-color-4: ${o[3]}${u};
$${e}-color-5: ${o[4]}${u};
$${e}-color-6: ${o[5]}${u};
$${e}-color-7: ${o[6]}${u};
$${e}-color-8: ${o[7]}${u};
$${e}-color-9: ${o[8]}${u};
$${e}-color-10: ${o[9]}${u};
`}const m=c("#125c9b"),p=c("#057748"),i=c("#96480c"),_=c("#b2252e"),$=c("");function g(){try{const e=[d("primary",m.value,!0),d("success",p.value,!0),d("warning",i.value,!0),d("danger",_.value,!0)].join("");$.value=e,console.log(e)}catch(e){T({type:"danger",title:e.message})}}return(e,t)=>{const n=s("ta-input"),o=s("ta-form-item"),u=s("ta-button"),V=s("ta-form"),y=s("ta-copy"),C=s("ta-group");return f(),w(C,{title:"\u8BBE\u7F6E\u4E3B\u9898\u989C\u8272"},{default:a(()=>[l(V,null,{footer:a(()=>[l(u,{type:"primary",onClick:g},{default:a(()=>[U]),_:1})]),default:a(()=>[l(o,{name:"primary",label:"primary \u8272",required:""},{default:a(()=>[l(n,{modelValue:m.value,"onUpdate:modelValue":t[0]||(t[0]=r=>m.value=r)},null,8,["modelValue"])]),_:1}),l(o,{name:"success",label:"success \u8272",required:""},{default:a(()=>[l(n,{modelValue:p.value,"onUpdate:modelValue":t[1]||(t[1]=r=>p.value=r)},null,8,["modelValue"])]),_:1}),l(o,{name:"warning",label:"warning \u8272",required:""},{default:a(()=>[l(n,{modelValue:i.value,"onUpdate:modelValue":t[2]||(t[2]=r=>i.value=r)},null,8,["modelValue"])]),_:1}),l(o,{name:"danger",label:"danger \u8272",required:""},{default:a(()=>[l(n,{modelValue:_.value,"onUpdate:modelValue":t[3]||(t[3]=r=>_.value=r)},null,8,["modelValue"])]),_:1})]),_:1}),$.value?(f(),B("div",F,[x("pre",null,"      "+E($.value)+`
      `,1),l(y,{onSuccess:t[4]||(t[4]=r=>k(N)("\u590D\u5236\u6210\u529F")),text:$.value},{default:a(()=>[j]),_:1},8,["text"])])):q("",!0)]),_:1})}}});export{z as default};
