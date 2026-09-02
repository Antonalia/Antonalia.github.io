---
title: 个人博客人 Hexo和Fluid的安装教程
excerpt: 在此文中我将会介绍Hexo的安装，Fluid主题的安装以及一些细节的配置
date: 2024-09-03 20:24:30
tags:
- Hexo
- Fluid
categories:
- 博客
---

使用命令 ping github.com  检查能否连接到GitHub

nodejs安装地址
https://nodejs.org/en/

GitHub Pages + Hexo搭建个人博客网站，史上最全教程，不要配置leancloud，无法使用
https://blog.csdn.net/yaorongke/article/details/119089190?spm=1001.2014.3001.5506

使用 Utterances 为静态博客添加评论，每篇文章在最后添加链接
https://roife.github.io/posts/use-utterances-for-blog-comment/#:~:text=%E6%89%93%E5%BC%80%20utterances%20-%20GitHub%20App%20%E7%82%B9%E5%87%BB%20Install%20%E8%BF%9B%E5%85%A5%E5%AE%89%E8%A3%85%E9%A1%B5%E9%9D%A2%E3%80%82,Only%20select%20repositories%20%EF%BC%8C%E5%B9%B6%E5%9C%A8%E4%B8%8B%E6%8B%89%E6%A1%86%E4%B8%AD%E9%80%89%E6%8B%A9%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2%E4%BB%93%E5%BA%93%EF%BC%88%E6%AF%94%E5%A6%82%E6%88%91%E5%B0%B1%E6%98%AF%20roife%2Froife.github.io%20%EF%BC%8C%E4%B9%9F%E5%8F%AF%E4%BB%A5%E5%AE%89%E8%A3%85%E5%88%B0%E5%85%B6%E4%BB%96%E4%BB%93%E5%BA%93%EF%BC%89%EF%BC%8C%E7%84%B6%E5%90%8E%E7%82%B9%E5%87%BB%20Install%20%E3%80%82
基于fluid主题的Hexo博客中添加评论
https://lizhening.github.io/posts/852186e5/
让你的 Hexo 博客更美观的 N 种配置（基于 Fluid 主题扩展）
https://www.jianshu.com/p/ba692a97a602

hexo使用指南，有修改文件html路径的方法
https://fuguigui.github.io/hexo2/#

hexo fluid用户手册
https://fluid-dev.github.io/hexo-fluid-docs/guide/#%E5%88%9B%E5%BB%BA%E9%A1%B5%E9%9D%A2

fluid主题配置
https://youlan-lan.github.io/2021/06/07/Hexo%20%E4%B8%BB%E9%A2%98%E4%B9%8B%20Fluid/

直接修改node_global和node_cache文件夹的权限
https://blog.csdn.net/HANZY72/article/details/122505375

hexo 中如何控制首页/归档页/tag页中显示的文章数
https://tanjuntao.github.io/2020/02/28/hexo-%E4%B8%AD%E5%A6%82%E4%BD%95%E6%8E%A7%E5%88%B6%E9%A6%96%E9%A1%B5-%E5%BD%92%E6%A1%A3%E9%A1%B5-tag%E9%A1%B5%E4%B8%AD%E6%98%BE%E7%A4%BA%E7%9A%84%E6%96%87%E7%AB%A0%E6%95%B0/

Hexo Fluid 主題使用指南
https://s81679.github.io/2020/02/25/hexo-theme-fluid/

hexo new "name"       # 新建文章，会在source下的_post里新建md文件
hexo new page "name"  # 新建页面，会在source下新建一个文件夹并在其中新建md文件，暂时不知道用处
hexo g                # 生成页面
hexo d                # 部署
hexo g -d             # 生成页面并部署
hexo s                # 本地预览
hexo clean            # 清除缓存和已生成的静态文件
hexo help             # 帮助
