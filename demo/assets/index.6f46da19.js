import{_ as k,d as D,a1 as r,c as C,a as l,w as p,F as L,s as U,f as E,o as V}from"./index.64ffe480.js";const A=D({name:"ExpImageUploader",setup(){const e=r([]),u=r(["https://cdn.fox2.cn/vfox/empty/default@2x.png","https://cdn.fox2.cn/vfox/empty/error@2x.png"]),m=r([]),g=(o,{formatSize:a})=>{if(o.size>1024*1024)return U(`\u4E0A\u4F20\u56FE\u7247\u4E0D\u80FD\u5927\u4E8E ${a(1024*1024)}`),!1;U(`\u4E0A\u4F20\u56FE\u7247\u5927\u5C0F\u4E3A ${a(o.size)}`)},f=(o,a)=>{a.setUploading("\u4E0A\u4F20\u4E2D..."),setTimeout(()=>{i(o).then(n=>{Math.random()>.5?a.fail("\u6A21\u62DF\u5931\u8D25"):a.success(n)})},2e3)};function i(o){return new Promise(a=>{const n=new FileReader;n.onload=function(h){var c,F;a((F=(c=h.target)==null?void 0:c.result)!=null?F:"")},n.readAsDataURL(o)})}return{imageList:e,imageList2:u,imageList3:m,hookBeforeUpload:g,hookUploadOrFail:f,hookUpload:(o,a)=>{i(o).then(n=>{a.success(n)})},onChange:o=>{console.log("change",o)},onDelete:o=>{console.log("delete",o)}}}});function y(e,u,m,g,f,i){const s=E("ak-image-uploader"),d=E("ak-group");return V(),C(L,null,[l(d,{title:"\u57FA\u7840\u7528\u6CD5"},{default:p(()=>[l(s,{uploadReady:e.hookUploadOrFail,onChange:e.onChange,onDelete:e.onDelete,accept:["png","jpg"],maxCount:9,modelValue:e.imageList,"onUpdate:modelValue":u[0]||(u[0]=t=>e.imageList=t),multiple:""},null,8,["uploadReady","onChange","onDelete","modelValue"])]),_:1}),l(d,{title:"\u4E0A\u4F20\u524D\u7F6E\u5904\u7406"},{default:p(()=>[l(s,{beforeUpload:e.hookBeforeUpload,uploadReady:e.hookUpload,accept:["png","jpg"],maxCount:9,modelValue:e.imageList3,"onUpdate:modelValue":u[1]||(u[1]=t=>e.imageList3=t),multiple:""},null,8,["beforeUpload","uploadReady","modelValue"])]),_:1}),l(d,{title:"\u7981\u7528\u5220\u9664"},{default:p(()=>[l(s,{modelValue:e.imageList2,"onUpdate:modelValue":u[2]||(u[2]=t=>e.imageList2=t),deletable:!1,uploadReady:e.hookUpload},null,8,["modelValue","uploadReady"])]),_:1}),l(d,{title:"\u7981\u7528\u4E0A\u4F20"},{default:p(()=>[l(s,{disabled:""})]),_:1})],64)}const $=k(A,[["render",y]]);export{$ as default};
