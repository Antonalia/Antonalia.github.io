---
title: Hexo+Fluid中Onblur事件，离开页面时的标题显示
excerpt: Onblur事件会在网页失去焦点时发生，即离开博客页面时显示的标题。当重新返回博客时会回归正常的页面标题
date: 
tags:
- Hexo
- Fluid
categories:
- 博客
math: false
typora-root-url: ./.. 
---
在博客配置下的hexo-blog\source\_inject中，若是没有文件夹则新建，然后在其中新建`monitortext.ejs`,用于向页面中添加焦点监控代码。

```css
<% if(theme.fun_features.monitortext.enable) { %>
	<script type="text/javascript">
	  /*窗口监视*/
	  var originalTitle = document.title;
	  window.onblur = function(){document.title = "<%- theme.fun_features.monitortext.text %>"};
	  window.onfocus = function(){document.title = originalTitle};
	</script>
  <% } %>
```

然后在hexo-blog\scripts中新建`page.js`文件，添加以下代码。也可以在官网找到具体描述[进阶用法 | Hexo Fluid 用户手册 (fluid-dev.com)](https://hexo.fluid-dev.com/docs/advance/#hexo-注入代码)。

```js
// 添加页面焦点监控文字
hexo.extend.filter.register('theme_inject', function(injects) {
    // 添加页面焦点监控文字(here)
    injects.bodyBegin.file('monitortext', "source/_inject/monitortext.ejs");
  });
```

最后编辑主题配置文件，即hexo-blog\themes\fluid中的`_config.yml`文件，在 `fun_features` 项下添加：

```js
# 一些好玩的功能
# Some fun features
fun_features:
  # 监控网页焦点，改变文字
  monitortext:
    enable: true
    text: 你想添加的文字

  # 为 subtitle 添加打字机效果
  # Typing animation for subtitle
  typing:
    enable: true

```



## 参考
1、[fluid主题无侵入式方式添加页面焦点监控文字](https://alec-97.github.io/posts/3644508848/)
<br>
2、[进阶用法 | Hexo Fluid 用户手册 (fluid-dev.com)](https://hexo.fluid-dev.com/docs/advance/#hexo-注入代码)