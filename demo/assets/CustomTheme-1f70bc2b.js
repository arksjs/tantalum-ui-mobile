import{d as b,r as c,b as w,w as r,f as s,o as f,a,g as v,c as x,k,t as N,u as T,s as q,e as B,j as U}from"./index-1677cc26.js";import{s as j}from"./index-036aa99f.js";const D={key:0,class:"exp-customTheme-code"},h=b({__name:"CustomTheme",setup(S){function d(e,t,u=!0){const o=U(t),l=u?"":" !default";return`
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
`}const $=c("#125c9b"),p=c("#057748"),i=c("#96480c"),_=c("#b2252e"),m=c("");function g(){try{const e=[d("primary",$.value,!0),d("success",p.value,!0),d("warning",i.value,!0),d("danger",_.value,!0)].join("");m.value=e,console.log(e)}catch(e){j({type:"danger",title:e.message})}}return(e,t)=>{const u=s("ta-input"),o=s("ta-form-item"),l=s("ta-button"),V=s("ta-form"),y=s("ta-copy"),C=s("ta-group");return f(),w(C,{title:"设置主题颜色"},{default:r(()=>[a(V,null,{footer:r(()=>[a(l,{type:"primary",onClick:g},{default:r(()=>[v("生成主题")]),_:1})]),default:r(()=>[a(o,{name:"primary",label:"primary 色",required:""},{default:r(()=>[a(u,{modelValue:$.value,"onUpdate:modelValue":t[0]||(t[0]=n=>$.value=n)},null,8,["modelValue"])]),_:1}),a(o,{name:"success",label:"success 色",required:""},{default:r(()=>[a(u,{modelValue:p.value,"onUpdate:modelValue":t[1]||(t[1]=n=>p.value=n)},null,8,["modelValue"])]),_:1}),a(o,{name:"warning",label:"warning 色",required:""},{default:r(()=>[a(u,{modelValue:i.value,"onUpdate:modelValue":t[2]||(t[2]=n=>i.value=n)},null,8,["modelValue"])]),_:1}),a(o,{name:"danger",label:"danger 色",required:""},{default:r(()=>[a(u,{modelValue:_.value,"onUpdate:modelValue":t[3]||(t[3]=n=>_.value=n)},null,8,["modelValue"])]),_:1})]),_:1}),m.value?(f(),x("div",D,[k("pre",null,"      "+N(m.value)+`
      `,1),a(y,{onSuccess:t[4]||(t[4]=n=>T(q)("复制成功")),text:m.value},{default:r(()=>[v("复制代码 ")]),_:1},8,["text"])])):B("",!0)]),_:1})}}});export{h as default};
