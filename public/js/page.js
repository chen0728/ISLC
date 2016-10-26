$(function(){
  /********************************
   * 主导航菜单
   * 依赖jquery.ui.tab
   *******************************/
  var leftmenuWp = $('#navAside'),
      leftmenu = $('#j_menu'),
      page_wrap = $('#pageWrap'),
      packupbtn = $('#packupBtn');
  var tabmore = $('#j_tabmore'),
      tab_label = $('#tabLabel'),
      tabmore_label = $('#tabmorelabel'),
      tabmore_count = $('#tabmorecount');
  var tabs = $('#j_tabspage').tabs({
    activate:function(event, ui){ ;
      //对左侧导航添加active选中
      leftmenu.find('li.active').removeClass('active');
      var _currleft = ui.newTab.data('currleftnav');
      if(_currleft){
        $(_currleft).addClass('active');
      }
      log(ui.newTab)
      //判断左侧导航状态是否为隐藏
      packupbtn.removeClass('open').hide();
      if(ui.newTab.data('allscreen')){
        page_wrap.addClass('pagewrap-an');
        leftmenuWp.addClass('navaside-packup').removeAttr('style');
        packupbtn.show();
      }else{
        page_wrap.removeClass('pagewrap-an');
        leftmenuWp.removeClass('navaside-packup').removeAttr('style');
        packupbtn.hide();
      }

      //记录当前页面到历史记录
      $.cookie('currentPage', ui.newPanel.data('active')+ '$$' + ui.newTab.find('a').text());
      //处理标签多出5个效果
      if(ui.newTab.hasClass('tab-nomarl')){
        tabmore.addClass('active');
        tabmore_label.text(ui.newTab.find('a').text());
      }else{
        tabmore_label.text(ui.newTab.parent().children(':eq(4)').find('a').text());
        tabmore.removeClass('active');
      }

      if(tabmore.hasClass('open')) tab_label.trigger('click');
    }
  });

  var tab_tpl = '<li><a href="#{href}"><span class="shape"></span>#{label}</a><span class="close-page">&times;</span></li>',
      tab_nav = tabs.find(".ui-tabs-nav"),
      tab_counter = 2;

  /* 新增一个新的标签页 */
  function addTab(pUrl, pTitle, pLeftnav){
      if(typeof(pUrl) == 'undefined'){
        alert('访问地址为空！');
        return;
      }

      //判断页面是否已经存在
      var _paged = page_wrap.children('[data-link="' + pUrl + '"]');
      if(_paged.size()>0){
        $('#'+ _paged.attr('aria-labelledby')).trigger('click');
        pageLoad(pUrl,_paged);
        return;
      }

      //控制标签页面的个数
      if(tab_nav.children().size() > 4){
        alert('您打开的页面过多，请关闭部分页面后再打开！');
        return;

      }

      //* 新增tab
      var _label = pTitle || "未命名",
          _tabid = "tabs-" + tab_counter,
          _tab = $(tab_tpl.replace(/#\{href\}/g, "#" + _tabid).replace(/#\{label\}/g, _label));

      if(pLeftnav) _tab.data('currleftnav',pLeftnav);//记录左侧打开标签的id

      if(pLeftnav){
        $('ul[role="tablist"]').find("li").each(function(){
          var panelid = $( this ).remove().attr( "aria-controls" );
          $( "#" + panelid ).remove();
          tabs.tabs( "refresh" );
          if(tabmore.hasClass('open')) tab_label.trigger('click');

          var _tabchild = tab_nav.children();
          if(_tabchild.size() > 5){

            _tabchild.filter('li:lt(4)').show().removeClass('tab-nomarl');
            _tabchild.eq(4).addClass('tab-nomarl');

            tabmore_count.text(_tabchild.filter('.tab-nomarl').size());
            if(_tabchild.filter('.ui-tabs-active').index() < 4){
              tabmore.removeClass('active');
              tabmore_label.text(_tabchild.eq(4).find('a').text());
            }

          }else{
            tabmore.hide()
            _tabchild.show().removeClass('tab-nomarl');
          }
        })
        /*$('ul[role="tablist"]').empty();*/
      }
      tab_nav.append( _tab );
      page_wrap.append('<div class="page" data-active="'+ pUrl +'" data-link="' + pUrl + '" id="' + _tabid + '"></div>');
      tabs.tabs("refresh");
      tab_counter++;

      //$('#'+ page_wrap.children(':last').data('change',true).attr('aria-labelledby')).trigger('click');
      aHistory.push('p'+_tabid);
      $.History.go('p'+_tabid);

      //处理tab标签超出规定个数
      var _tabchild = tab_nav.children(),
          _tabchild_dot = _tabchild.eq(4);
      if(_tabchild.size() > 5){
        tabmore.show();
        _tab.addClass('tab-nomarl');
        if(_tabchild.size() == 6){
          _tabchild_dot.hide().addClass('tab-nomarl');
        }
        var _moretabid = _tabchild.filter('.tab-nomarl');
        tabmore.addClass('active');
        tabmore_label.text(_label);
        tabmore_count.text(_moretabid.size());
      }

      //加载页面内容
      pageLoad(pUrl,$('#' + _tabid));
      if(pLeftnav){
        $('ul[role="tablist"]').find("li").find("span[class='close-page']").remove();
      }
  }

  /* 删除标签页 */
  tab_nav.delegate( ".close-page", "click", function() {
    var panelid = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelid ).remove();
    tabs.tabs( "refresh" );
    if(tabmore.hasClass('open')) tab_label.trigger('click');

    var _tabchild = tab_nav.children();
    if(_tabchild.size() > 5){

      _tabchild.filter('li:lt(4)').show().removeClass('tab-nomarl');
      _tabchild.eq(4).addClass('tab-nomarl');

      tabmore_count.text(_tabchild.filter('.tab-nomarl').size());
      if(_tabchild.filter('.ui-tabs-active').index() < 4){
        tabmore.removeClass('active');
        tabmore_label.text(_tabchild.eq(4).find('a').text());
      }

    }else{
      tabmore.hide()
      _tabchild.show().removeClass('tab-nomarl');
    }
  });

  /* 展开下来tab页 */
  tab_label.click(function(){
    if(tabmore.hasClass('open')){
      tabmore.removeClass('open');
      tab_nav.children('.tab-nomarl').hide();
    }else{
      tabmore.addClass('open');
      tab_nav.children('.tab-nomarl').show();
    }
  });

  /********************************
   * 侧边导航菜单
   * 依赖jquery.ztree插件
   *******************************/
  var menu_setting = {
    view: {
      dblClickExpand: false,
      showLine: false,
      selectedMulti: false,
      showIcon: false,
      showTitle:false
    },
    data: {
      simpleData: {
        enable:true,
        idKey: "id",
        pIdKey: "pid",
        rootPId: ""
      }
    },
    callback: {
      onClick: function(event, treeId, treeNode){
        var _button = $('#'+treeNode.tId+'_switch');
        if(!_button.hasClass('noline_docu')){
          var _menu = $.fn.zTree.getZTreeObj("j_menu");
          _menu.expandNode(treeNode);
        }else{
          addTab(treeNode.link, treeNode.name, '#'+treeNode.tId);
        }
      }
    }
  };


  $.fn.zTree.init(leftmenu, menu_setting, menu_data);

  /********************************
   * 链接跳转
   * 历史记录依赖 jquery.history
   *******************************/

  //定义历史记录变量用于存放历史记录
  var aHistory = new Array('ptabs-1');

  $.History.go('ptabs-1');

  var currentPage = $.cookie('currentPage');

  if(currentPage != null ){
    currentPage = currentPage.split('$$');
    if(currentPage[0] != 'undefined'){
      addTab(currentPage[0],currentPage[1]);
    }
  }

  //绑定所有a标签
  page_wrap.on('click', 'a', function(){
    var _this = $(this),
        _href = _this.attr('href');
    if(!_href) return;
    //过滤url
    if(/^javascript:/.test(_href) || /^#+/.test(_href)) return;
    if(_this.data('ajax') == false) return;

    var _title;
    //打开位置
    if(_this.attr('target') == '_blank'){
      //新标签打开
      _title = _this.data('title');
      addTab(_href, _title);
    }else{
      //当前标签打开
      var _page = _this.parents('.page.ui-tabs-panel');
      _title = $('#' + _page.attr('aria-labelledby')).text();
      _page.data('active', _href + '$$' + _title);
      $.cookie('currentPage', _href + '$$' + _title);

      pageLoad(_href, _page);
    }
    return false;
  });

  //监控历史记录
  $.History.bind(function(hash){
    for(var i in aHistory){
      if(aHistory[i] == hash){
        tab_nav.find('a[href="#' + hash.substr(1) + '"]').trigger('click');
      }
    }
  });

  //页面加载
  function pageLoad(s_url, $selector){
    $selector.empty();
    $selector.load(s_url);
  }

  /********************************
   * 左侧导航的展示与收起
   *******************************/
  packupbtn.bind({
    'click':function(){
      var $this = $(this);
      if($this.hasClass('open')){
        $this.removeClass('open');
        leftmenuWp.hide();
      }else{
        $this.addClass('open');
        leftmenuWp.show();
      }
    }
  });
  /*  //行程介绍酒店评分
   $('.j_raty').raty({
   readOnly: true,
   score: 4.5,
   half: true,
   starHalf: 'images/raty_img/star-half.png',
   starOn: 'images/raty_img/star-on.png',
   starOff: 'images/raty_img/star-off.png'
   });*/
});

/********************************
 * 公用页面跳转
 *******************************/
function pageJump(s_url, $selector, s_title){
  $selector.data('active', s_url + '$$' + s_title);
  $.cookie('currentPage', s_url + '$$' + s_title);
  $selector.empty();
  $selector.load(s_url);
}