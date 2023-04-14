import{_ as s,c as n,o as a,e as l}from"./app.31718e87.js";const i=JSON.parse('{"title":"\u4E3B\u9898\u5B9A\u5236","description":"","frontmatter":{},"headers":[],"relativePath":"guide/theme.md"}'),p={name:"guide/theme.md"},o=l(`<h1 id="\u4E3B\u9898\u5B9A\u5236" tabindex="-1">\u4E3B\u9898\u5B9A\u5236 <a class="header-anchor" href="#\u4E3B\u9898\u5B9A\u5236" aria-hidden="true">#</a></h1><p>\u7EC4\u4EF6\u5E93\u7684\u6837\u5F0F\u662F\u57FA\u4E8E SCSS \u5F00\u53D1\u7684\uFF0C\u53EF\u4EE5\u901A\u8FC7\u63D0\u4F9B\u7684\u5DE5\u5177\u5B8C\u6210\u4E3B\u9898\u7684\u4E2A\u6027\u5316\u5B9A\u5236\uFF0C\u4E3B\u8981\u662F\u8272\u5F69\u76F8\u5173\u3002</p><p>\u5728\u4E3B\u9898\u5B9A\u5236\u4E4B\u524D\uFF0C\u63A8\u8350\u901A\u8FC7 <a href="https://arksjs.github.io/tantalum-ui-mobile/demo/#/ColorCard" target="_blank" rel="noreferrer">\u8272\u5361</a> \u67E5\u770B\u4E0B\u4F60\u949F\u610F\u7684\u989C\u8272\u5728\u8272\u5361\u4E2D\u7684\u6548\u679C\u3002\u63A8\u8350\u989C\u8272\u503C\u5728 HSV \u6A21\u5F0F\u4E0B <strong>S &gt; 70% \u4E14 V &gt; 70%</strong>\u3002</p><ol><li><p>\u6253\u5F00 <a href="https://arksjs.github.io/tantalum-ui-mobile/demo/#/CustomTheme" target="_blank" rel="noreferrer">\u4E3B\u9898\u5B9A\u5236</a> \u5DE5\u5177\uFF0C\u6309\u64CD\u4F5C\u5B8C\u6210\u5B9A\u5236\u5E76\u590D\u5236\u5B9A\u5236\u540E\u7684\u4EE3\u7801\u3002</p></li><li><p>\u65B0\u5EFA\u81EA\u5B9A\u4E49 SCSS \u6587\u4EF6 <code>my-style.scss</code>\uFF0C\u7C98\u8D34\u5B9A\u5236\u4EE3\u7801\uFF0C\u5982\uFF1A</p><p><code>path/to/my-style.scss</code> :</p></li></ol><div class="language-Scss"><button title="Copy Code" class="copy"></button><span class="lang">Scss</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$primary-color-1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">c8d5db</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">9cbece</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-3</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">73a5c1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-4</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">4f8cb4</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-5</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">2e74a8</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">125c9b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-7</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">083f75</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-8</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">01264e</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-9</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">001228</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$primary-color-10</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">000102</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">a4b7ac</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">74aa8d</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-3</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">529d77</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-4</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">349164</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-5</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">1b8455</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">057748</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-7</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">005132</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-8</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">002b1c</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-9</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">000403</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$success-color-10</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">00dd9f</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">d6cdc0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">c9b191</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-3</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">bc9669</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-4</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">b07b46</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-5</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">a36127</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">96480c</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-7</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">702f03</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-8</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">4a1b00</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-9</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">230c00</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$warning-color-10</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">fc4c00</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">f2e5e3</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">e5c5c2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-3</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">d89795</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-4</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">cb6c6b</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-5</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">bf464a</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">b2252e</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-7</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">8c1621</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-8</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">660b17</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-9</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">3f040d</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">$danger-color-10</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">190106</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>Vite \u914D\u7F6E</li></ol><div class="language-JavaScript"><button title="Copy Code" class="copy"></button><span class="lang">JavaScript</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineConfig</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vite</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> vue </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vitejs/plugin-vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> Components </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">unplugin-vue-components/vite</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;">// import { UIResolver } from &#39;@arksjs/ui-resolver&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">vue</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// Components({</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">//   dts: true,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">//   resolvers: [UIResolver({ importStyle: &#39;sass&#39; })]</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// })</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">css</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">preprocessorOptions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">scss</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">additionalData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">@use &quot;path/to/my-style.scss&quot; as *;</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>\u6CE8\uFF1AVue Cli \u4E5F\u6709\u76F8\u5E94\u7684\u914D\u7F6E\u3002</p><ol start="4"><li>\u5B89\u88C5 scss \u4F9D\u8D56</li></ol><p><strong>Vite</strong> \u53EA\u9700\u8981\u9884\u88C5 sass \u9884\u5904\u7406\u5668\uFF0C\u5177\u4F53\u8BF7\u53C2\u9605 <a href="https://cn.vitejs.dev/guide/features.html#css-pre-processors" target="_blank" rel="noreferrer">CSS Pre-processors</a>\u3002</p><div class="language-Shell"><button title="Copy Code" class="copy"></button><span class="lang">Shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm install -D sass</span></span>
<span class="line"></span></code></pre></div><p><strong>Vue CLI</strong> \u8FD8\u9700\u8981\u76F8\u5E94\u7684 loader\uFF0C\u5177\u4F53\u8BF7\u53C2\u9605 <a href="https://cli.vuejs.org/zh/guide/css.html#%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8" target="_blank" rel="noreferrer">\u9884\u5904\u7406\u5668</a>\u3002</p><div class="language-Shell"><button title="Copy Code" class="copy"></button><span class="lang">Shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm install -D sass-loader sass</span></span>
<span class="line"></span></code></pre></div>`,13),e=[o];function c(r,D,t,y,C,F){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{i as __pageData,d as default};