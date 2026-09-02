// 添加页面焦点监控文字
hexo.extend.filter.register('theme_inject', function(injects) {
    // 添加页面焦点监控文字(here)
    injects.bodyBegin.file('monitortext', "source/_inject/monitortext.ejs");
  });