import{d as C,r as c,b,w as a,f as s,o as f,a as u,c as w,l as B,t as x,u as E,k as N,e as q,h as v,s as D,i as T}from"./index.95fccdd4.js";const U=v("\u751F\u6210\u4E3B\u9898"),F={key:0,class:"exp-customTheme-code"},h=v("\u590D\u5236\u4EE3\u7801 "),G=C({setup(S){function d(e,t,n=!0){const o=T(t),l=n?"":" !default";return`
$${e}-color-1: ${o[0]}${l};
$${e}-color-2: ${o[1]}${l};
$${e}-color-3: ${o[2]}${l};
$${e}-color-4: ${o[3]}${l};
$${e}-color-5: ${o[4]}${l};
$${e}-color-6: ${o[5]}${l};
$${e}-color-7: ${o[6]}${l};
$${e}-color-8: ${o[7]}${l};
$${e}-color-9: ${o[8]}${l};
$${e}-color-10: ${o[9]}${l};
`}const m=c("#125c9b"),i=c("#057748"),p=c("#96480c"),_=c("#b2252e"),$=c("");function k(){try{const e=[d("primary",m.value,!0),d("success",i.value,!0),d("warning",p.value,!0),d("danger",_.value,!0)].join("");$.value=e,console.log(e)}catch(e){D({type:"danger",title:e.message})}}return(e,t)=>{const n=s("ak-input"),o=s("ak-form-item"),l=s("ak-button"),g=s("ak-form"),V=s("ak-copy"),y=s("ak-group");return f(),b(y,{title:"\u8BBE\u7F6E\u4E3B\u9898\u989C\u8272"},{default:a(()=>[u(g,null,{footer:a(()=>[u(l,{type:"primary",onClick:k},{default:a(()=>[U]),_:1})]),default:a(()=>[u(o,{name:"primary",label:"primary \u8272",required:""},{default:a(()=>[u(n,{modelValue:m.value,"onUpdate:modelValue":t[0]||(t[0]=r=>m.value=r)},null,8,["modelValue"])]),_:1}),u(o,{name:"success",label:"success \u8272",required:""},{default:a(()=>[u(n,{modelValue:i.value,"onUpdate:modelValue":t[1]||(t[1]=r=>i.value=r)},null,8,["modelValue"])]),_:1}),u(o,{name:"warning",label:"warning \u8272",required:""},{default:a(()=>[u(n,{modelValue:p.value,"onUpdate:modelValue":t[2]||(t[2]=r=>p.value=r)},null,8,["modelValue"])]),_:1}),u(o,{name:"danger",label:"danger \u8272",required:""},{default:a(()=>[u(n,{modelValue:_.value,"onUpdate:modelValue":t[3]||(t[3]=r=>_.value=r)},null,8,["modelValue"])]),_:1})]),_:1}),$.value?(f(),w("div",F,[B("pre",null,"      "+x($.value)+`
      `,1),u(V,{onSuccess:t[4]||(t[4]=r=>E(N)("\u590D\u5236\u6210\u529F")),text:$.value},{default:a(()=>[h]),_:1},8,["text"])])):q("",!0)]),_:1})}}});export{G as default};
