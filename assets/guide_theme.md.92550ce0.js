import{_ as n,c as s,o as a,e as p}from"./app.22089141.js";const v='{"title":"\u4E3B\u9898\u5B9A\u5236","description":"","frontmatter":{},"headers":[],"relativePath":"guide/theme.md"}',t={},o=p(`<h1 id="\u4E3B\u9898\u5B9A\u5236" tabindex="-1">\u4E3B\u9898\u5B9A\u5236 <a class="header-anchor" href="#\u4E3B\u9898\u5B9A\u5236" aria-hidden="true">#</a></h1><p>\u7EC4\u4EF6\u5E93\u7684\u6837\u5F0F\u662F\u57FA\u4E8E SCSS \u5F00\u53D1\u7684\uFF0C\u53EF\u4EE5\u901A\u8FC7\u63D0\u4F9B\u7684\u5DE5\u5177\u5B8C\u6210\u4E3B\u9898\u7684\u4E2A\u6027\u5316\u5B9A\u5236\uFF0C\u4E3B\u8981\u662F\u8272\u5F69\u76F8\u5173\u3002</p><p>\u5728\u4E3B\u9898\u5B9A\u5236\u4E4B\u524D\uFF0C\u63A8\u8350\u901A\u8FC7 <a href="https://arksjs.github.io/arkui-mobile-vue/demo/#/ColorCard" target="_blank" rel="noopener noreferrer">\u8272\u5361</a> \u67E5\u770B\u4E0B\u4F60\u949F\u610F\u7684\u989C\u8272\u5728\u8272\u5361\u4E2D\u7684\u6548\u679C\u3002\u63A8\u8350\u989C\u8272\u503C\u5728 HSV \u6A21\u5F0F\u4E0B <strong>S &gt; 70% \u4E14 V &gt; 70%</strong>\u3002</p><ol><li><p>\u6253\u5F00 <a href="https://arksjs.github.io/arkui-mobile-vue/demo/#/CustomTheme" target="_blank" rel="noopener noreferrer">\u4E3B\u9898\u5B9A\u5236</a> \u5DE5\u5177\uFF0C\u6309\u64CD\u4F5C\u5B8C\u6210\u5B9A\u5236\u5E76\u590D\u5236\u5B9A\u5236\u540E\u7684\u4EE3\u7801\u3002</p></li><li><p>\u65B0\u5EFA\u81EA\u5B9A\u4E49 SCSS \u6587\u4EF6 <code>my-style.scss</code>\uFF0C\u7C98\u8D34\u5B9A\u5236\u4EE3\u7801\uFF0C\u5982\uFF1A</p><p><code>path/to/my-style.scss</code> :</p></li></ol><div class="language-Scss"><pre><code><span class="token property"><span class="token variable">$primary-color-1</span></span><span class="token punctuation">:</span> #c8d5db<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-2</span></span><span class="token punctuation">:</span> #9cbece<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-3</span></span><span class="token punctuation">:</span> #73a5c1<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-4</span></span><span class="token punctuation">:</span> #4f8cb4<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-5</span></span><span class="token punctuation">:</span> #2e74a8<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-6</span></span><span class="token punctuation">:</span> #125c9b<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-7</span></span><span class="token punctuation">:</span> #083f75<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-8</span></span><span class="token punctuation">:</span> #01264e<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-9</span></span><span class="token punctuation">:</span> #001228<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$primary-color-10</span></span><span class="token punctuation">:</span> #000102<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-1</span></span><span class="token punctuation">:</span> #a4b7ac<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-2</span></span><span class="token punctuation">:</span> #74aa8d<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-3</span></span><span class="token punctuation">:</span> #529d77<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-4</span></span><span class="token punctuation">:</span> #349164<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-5</span></span><span class="token punctuation">:</span> #1b8455<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-6</span></span><span class="token punctuation">:</span> #057748<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-7</span></span><span class="token punctuation">:</span> #005132<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-8</span></span><span class="token punctuation">:</span> #002b1c<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-9</span></span><span class="token punctuation">:</span> #000403<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$success-color-10</span></span><span class="token punctuation">:</span> #00dd9f<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-1</span></span><span class="token punctuation">:</span> #d6cdc0<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-2</span></span><span class="token punctuation">:</span> #c9b191<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-3</span></span><span class="token punctuation">:</span> #bc9669<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-4</span></span><span class="token punctuation">:</span> #b07b46<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-5</span></span><span class="token punctuation">:</span> #a36127<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-6</span></span><span class="token punctuation">:</span> #96480c<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-7</span></span><span class="token punctuation">:</span> #702f03<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-8</span></span><span class="token punctuation">:</span> #4a1b00<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-9</span></span><span class="token punctuation">:</span> #230c00<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$warning-color-10</span></span><span class="token punctuation">:</span> #fc4c00<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-1</span></span><span class="token punctuation">:</span> #f2e5e3<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-2</span></span><span class="token punctuation">:</span> #e5c5c2<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-3</span></span><span class="token punctuation">:</span> #d89795<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-4</span></span><span class="token punctuation">:</span> #cb6c6b<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-5</span></span><span class="token punctuation">:</span> #bf464a<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-6</span></span><span class="token punctuation">:</span> #b2252e<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-7</span></span><span class="token punctuation">:</span> #8c1621<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-8</span></span><span class="token punctuation">:</span> #660b17<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-9</span></span><span class="token punctuation">:</span> #3f040d<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$danger-color-10</span></span><span class="token punctuation">:</span> #190106<span class="token punctuation">;</span>
</code></pre></div><ol start="3"><li>Vite \u914D\u7F6E</li></ol><div class="language-JavaScript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>
<span class="token keyword">import</span> Components <span class="token keyword">from</span> <span class="token string">&#39;unplugin-vue-components/vite&#39;</span>
<span class="token comment">// import { ArkUIResolver } from &#39;@arksjs/ui-resolver&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// Components({</span>
    <span class="token comment">//   dts: true,</span>
    <span class="token comment">//   resolvers: [ArkUIResolver({ importStyle: &#39;sass&#39; })]</span>
    <span class="token comment">// })</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">css</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">preprocessorOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">scss</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">additionalData</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">@use &quot;path/to/my-style.scss&quot; as *;</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>\u6CE8\uFF1AVue Cli \u4E5F\u6709\u76F8\u5E94\u7684\u914D\u7F6E\u3002</p><ol start="4"><li>\u5B89\u88C5 scss \u4F9D\u8D56</li></ol><p><strong>Vite</strong> \u53EA\u9700\u8981\u9884\u88C5 sass \u9884\u5904\u7406\u5668\uFF0C\u5177\u4F53\u8BF7\u53C2\u9605 <a href="https://cn.vitejs.dev/guide/features.html#css-pre-processors" target="_blank" rel="noopener noreferrer">CSS Pre-processors</a>\u3002</p><div class="language-Shell"><pre><code><span class="token function">npm</span> <span class="token function">install</span> -D sass
</code></pre></div><p><strong>Vue CLI</strong> \u8FD8\u9700\u8981\u76F8\u5E94\u7684 loader\uFF0C\u5177\u4F53\u8BF7\u53C2\u9605 <a href="https://cli.vuejs.org/zh/guide/css.html#%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8" target="_blank" rel="noopener noreferrer">\u9884\u5904\u7406\u5668</a>\u3002</p><div class="language-Shell"><pre><code><span class="token function">npm</span> <span class="token function">install</span> -D sass-loader sass
</code></pre></div>`,13),e=[o];function c(l,r,u,i,k,d){return a(),s("div",null,e)}var b=n(t,[["render",c]]);export{v as __pageData,b as default};
