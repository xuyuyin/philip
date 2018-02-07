(function() {
  var wxapi = "//res.wx.qq.com/open/js/jweixin-1.2.0.js", qqapi = "//open.mobile.qq.com/sdk/qqapi.js?_bid=152", qzapi = "//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339";
  var require;
  function _require(url, onload) {
    var doc = document;
    var head = doc.head || (doc.getElementsByTagName("head")[0] || doc.documentElement);
    var node = doc.createElement("script");
    node.onload = onload;
    node.onerror = function() {
    };
    node.async = true;
    node.src = url[0];
    head.appendChild(node);
  }
  function _initWX(data) {
    if (!data.WXconfig) {
      return;
    }
    require([wxapi], function(wx) {
      if (!wx.config) {
        wx = window.wx;
      }
      var conf = data.WXconfig;
      wx.config(conf);
      wx.error(function(res) {
      });
      wx.ready(function () {
        console.log(data);
        var config = {title:data.title, desc:data.summary, link:data.url, imgUrl:data.pic, type:"", dataUrl:"", success:function() {
          data.callback && data.callback();
        }, cancel:function() {
        }};
        wx.onMenuShareAppMessage(config);
        wx.onMenuShareQQ(config);
        wx.onMenuShareQZone(config);
        if (conf.swapTitleInWX) {
          wx.onMenuShareTimeline({
            title: data.title +"-"+ data.summary, link: data.url, imgUrl: data.pic, success: function () {
              data.callback && data.callback();
            }, cancel: function () { }
          });
          // wx.onMenuShareTimeline({title:data.summary, desc:data.title, link:data.url, imgUrl:data.pic, type:"", dataUrl:"", success:function() {
          //   data.callback && data.callback();
          // }, cancel:function() {
          // }});
        } else {
          // wx.onMenuShareTimeline({
          //   title: data.title + data.summary, link: data.url, imgUrl: data.pic, success: function () {
          //     data.callback && data.callback();
          //   }, cancel: function () { }
          // });
          wx.onMenuShareTimeline(config);
        }
      });
    });
  }
  function _initQQ(data) {
    var info = {title:data.title, desc:data.summary, share_url:data.url, image_url:data.pic};
    function doQQShare() {
      try {
        if (data.callback) {
          window.mqq.ui.setOnShareHandler(function(type) {
            if (type == 3 && (data.swapTitle || data.WXconfig && data.WXconfig.swapTitleInWX)) {
              info.title = data.summary;
            } else {
              info.title = data.title;
            }
            info.share_type = type;
            info.back = true;
            window.mqq.ui.shareMessage(info, function(result) {
              if (result.retCode === 0) {
                data.callback && data.callback.call(this, result);
              }
            });
          });
        } else {
          window.mqq.data.setShareInfo(info);
        }
      } catch (e) {
      }
    }
    if (window.mqq) {
      doQQShare();
    } else {
      require([qqapi], function() {
        doQQShare();
      });
    }
  }
  function _initQZ(data) {
    function doQZShare() {
      if (QZAppExternal && QZAppExternal.setShare) {
        var imageArr = [], titleArr = [], summaryArr = [], shareURLArr = [];
        for (var i = 0;i < 5;i++) {
          imageArr.push(data.pic);
          shareURLArr.push(data.url);
          if (i === 4 && (data.swapTitle || data.WXconfig && data.WXconfig.swapTitleInWX)) {
            titleArr.push(data.summary);
            summaryArr.push(data.title);
          } else {
            titleArr.push(data.title);
            summaryArr.push(data.summary);
          }
        }
        QZAppExternal.setShare(function(data) {
        }, {"type":"share", "image":imageArr, "title":titleArr, "summary":summaryArr, "shareURL":shareURLArr});
      }
    }
    if (window.QZAppExternal) {
      doQZShare();
    } else {
      require([qzapi], function() {
        doQZShare();
      });
    }
  }
  function init(opts) {
    var ua = navigator.userAgent;
    var isWX = ua.match(/MicroMessenger\/([\d\.]+)/), isQQ = ua.match(/QQ\/([\d\.]+)/), isQZ = ua.indexOf("Qzone/") !== -1;
    isWX && _initWX(opts);
    isQQ && _initQQ(opts);
    isQZ && _initQZ(opts);
  }

  if (typeof define === "function" && (define.cmd || define.amd)) {
    if (define.cmd) {
      require = seajs.use;
    } else {
      if (define.amd) {
        require = window.require;
      }
    }
    define(function() {
      return init;
    });
  } else {
    require = _require;
    window.setShareInfo = init;
  }
})();
var mInfo = {
	dataBool:false,
	title:'虫虫之家',
  summary:'创新镜像教学模式，帮助宝宝建立自信，快来试试吧～',
  pic:'http://kids.familyktv.com/s/img/fx.png',
  url:'http://kids.familyktv.com/index.html'
};

var updataShare = function(mObj){
	if(mObj){
		if(mObj.imgUrl)mInfo.pic = mObj.imgUrl;
		if(mObj.url)mInfo.url = mObj.url;
		if(mObj.tTitle)mInfo.title = mObj.tTitle;
		if(mObj.tContent)mInfo.summary = mObj.tContent;
	}
	if(mInfo.dataBool){
    // alert(JSON.stringify(mInfo));
		setShareInfo(mInfo);
	}
};
var loadDataWxFun = function(wxUrl){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		$.ajax({
			url:'http://campaign.d2-stu.com/share/wxauth/index.php', 
			type: 'POST',
			dataType: 'json',
			data: {r:Math.random()},
			success: function(msg) {
				mInfo.WXconfig = {
          debug: false,
          swapTitleInWX: true,
          appId: msg.appId,
          timestamp: msg.timestamp,
          nonceStr: msg.nonceStr,
          signature: msg.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem'
          ]
        }
        mInfo.url = msg.url;
        updataShare(null);
        mInfo.dataBool = true;
			},
			error: function(msg) {}
		});
	}else{
		updataShare(null);
		mInfo.dataBool = true;
	}
};
loadDataWxFun(location.href.split('#')[0]);



