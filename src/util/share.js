/* eslint-disable no-undef */

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

// 分享配置异常提示
const errorTip =
    '分享配置应为一个配置对象,包括分享回调链接link，分享标题title，分享描述信息description，分享时展示的小图标imgUrl';

const share = {
    // 是否在link app环境中， return boolean
    isInAppAsyn: () => {
        if (typeof $ljBridge === 'undefined' || !$ljBridge) {
            return false;
        }
        const webStatus = $ljBridge && $ljBridge.webStatus;
        if (webStatus && (webStatus.isLinkApp || webStatus.isDeyou)) {
            return true;
        }
        return false;
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
    setJsbridgeShare: config => {
        if (typeof $ljBridge === 'undefined' || !$ljBridge) {
            throw new Error('没有检测到$ljBridge');
        }
        if (!config) {
            throw new Error(errorTip);
        }
        const url = `${config.link}&psource=share_link`;
        if ($ljBridge) {
            $ljBridge.ready(bridge => {
                bridge.setRightButton('["share"]');
                const shareconfig = {
                    articleTitle: config.title,
                    articleDiscription: config.description,
                    requestUrl: url,
                    headImageUrl: config.imgUrl
                };
                bridge.setShareConfigWithString(JSON.stringify(shareconfig));
            });
        }
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
    setShareInfo: config => {
        if (!config) {
            throw new Error(errorTip);
        }
        if (validate.isWeiXin()) {
            // 这里调用公司通用微信sdk封装js，暴露weixinUtil
            const weixinShareConfig = {
                url: `${config.link}&psource=share_wx`,
                shareTitle: config.title,
                descContent: config.description,
                imgUrl: config.imgUrl
            };
            if (typeof weixinUtil !== 'undefined') {
                weixinUtil.setWinxinConfig(weixinShareConfig);
            }
        } else if (share.isInAppAsyn()) {
            share.setJsbridgeShare(config);
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
    actionShare: config => {
        if (!config) {
            throw new Error(errorTip);
        }
        if (share.isInAppAsyn()) {
            $ljBridge.ready(bridge => {
                const url = `${config.link}&psource=share_link`;
                const shareconfig = {
                    articleTitle: config.title,
                    articleDiscription: config.description,
                    requestUrl: url,
                    smsContent: url,
                    headImageUrl: config.imgUrl
                };
                bridge.actionShareWithString(JSON.stringify(shareconfig));
            });
        }
    }
};
export default share;
/* eslint-enable */
