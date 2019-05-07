/**
 * @file 分享相关
 * @exports
 * setShareInfo 支持link app\Deyou app分享和微信分享
 * actionShare link app直接呼起分享浮层
 * 
 * 备注：h5页面要在html中加载link的ljBridge.js文件和公司提供封装的微信SDK文件
 * 
 *  <script type="text/javascript" crossorigin="anonymous" src="http://s1.ljcdn.com/m-base/release/v04.2/asset/bridge_7bb77bfd09380a4e.js"></script>
    <script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="https://s1.ljcdn.com/transaction-public-static/weixinAuth/weixinUtil-1.0.0.js"></script>  

 * @author xiaomin006@ke.com
 * @date 2019/5/7
 */
import validate from './validate.js';
const share = {
    // 是否在link app环境中， return boolean
    isInAppAsyn: () => {
        if(!$ljBridge){
            return;
        }
        const webStatus = $ljBridge && $ljBridge.webStatus;
        if(webStatus && (webStatus.isLinkApp || webStatus.isDeyou)){
            return true;
        }
        else{
            return false;
        }
    },
    /**
     *  @func link里分享设置
     *  @param object
     *  {
            description: "",  // 分享卡片描述
            title: "",  // 标题
            link: ``,   // 分享卡片点击跳转地址
            imgUrl: ''  // 分享图片
        };
     */
    setJsbridgeShare: (config) => {
        if(!$ljBridge || !config){
            return;
        }
        let url = `${config.link}&psource=share_link`;
        $ljBridge && $ljBridge.ready(function (bridge, webStatus) {
            bridge.setRightButton('["share"]');
            var shareconfig = {
                articleTitle: config.title,
                articleDiscription: config.description,
                requestUrl: url,
                headImageUrl: configo.imgUrl
            };
            bridge.setShareConfigWithString(JSON.stringify(shareconfig));        
        });
    },
    /**
     * 分享信息设置，微信、link统一入口
     *  @param object
     *  {
            description: "",  // 分享卡片描述
            title: "",  // 标题
            link: ``,   // 分享卡片点击跳转地址
            imgUrl: ''  // 分享图片
        };
     */
    setShareInfo: (config) => {
        if (!config) {
            return;
        }
        if(validate.isWeiXin()){
          //这里调用公司通用微信sdk封装js，暴露weixinUtil
          let weixinShareConfig = {
            url: `${config.link}&psource=share_wx`,
            shareTitle: config.title,
            descContent: config.description,
            imgUrl: config.imgUrl,
          }
          weixinUtil && weixinUtil.setWinxinConfig(weixinShareConfig);        
        }
        else {
          if(this.isInAppAsyn()){
            jsbridge.setJsbridgeShare(config);
          }
        }
      },
      /**
       * link app直接呼起分享浮层,设置的分享内容只对此次分享有效
       * @param object
       {
            description: "",  // 分享卡片描述
            title: "",  // 标题
            link: ``,   // 分享卡片点击跳转地址
            imgUrl: ''  // 分享图片
        };
        */
      actionShare: (config) => {
        if (!config) {
            return;
        }
        if(this.isInAppAsyn()){
          $ljBridge.ready(function (bridge, webStatus) {
            let url = `${config.link}&psource=share_link`;
            var shareconfig = {
                articleTitle: shareinfo.title,
                articleDiscription: shareinfo.description,
                requestUrl: url,
                smsContent: url,
                headImageUrl: shareinfo.imgUrl
            };
            bridge.actionShareWithString(JSON.stringify(shareconfig));
          });
        }    
      },
};
export default share;