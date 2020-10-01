import share from '../../src/util/share';

const errorTip =
    '分享配置应为一个配置对象,包括分享回调链接link，分享标题title，分享描述信息description，分享时展示的小图标imgUrl';
const config = {
    description: 'desc', // 分享卡片描述
    title: 'title', // 标题
    link: 'http://ke.family.com', // 分享卡片点击跳转地址
    imgUrl: '**' // 分享图片
};
/* eslint-disable */
describe('validate', () => {
    // 每个测试用例执行前都会还原数据，所以下面两个测试可以通过。
    beforeEach(() => {
        document.cookie = '';
    });

    test('isInAppAsyn', () => {
        expect(!share.isInAppAsyn()).toBeTruthy();
        window.$ljBridge = {};
        expect(!share.isInAppAsyn()).toBeTruthy();
        window.$ljBridge = {
            webStatus: {}
        };
        expect(!share.isInAppAsyn()).toBeTruthy();
        window.$ljBridge.webStatus = {
            isLinkApp: true
        };
        expect(share.isInAppAsyn()).toBeTruthy();
        window.$ljBridge.webStatus = {
            isDeyou: true
        };
        expect(share.isInAppAsyn()).toBeTruthy();
    });

    test('setShareInfo', () => {
        // 没有配置参数时，是否正常shrow error
        // 我们必须使用一个函数将将被测试的函数做一个包装,否则会因为函数抛出导致该断言失败
        function setShareInfoFn() {
            share.setShareInfo();
        }
        expect(setShareInfoFn).toThrow(errorTip);

        // 修改ua,成为微信环境
        let ua =
            'Mozilla/5.0 (Linux; Android 5.1; HUAWEI TAG-AL00 Build/HUAWEITAG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043622 Safari/537.36 MicroMessenger/6.6.1.1220(0x26060135) NetType/4G Language/zh_CN';
        Object.defineProperties(navigator, {
            userAgent: {
                value: ua,
                configurable: true,
                enumerable: true,
                writable: true
            }
        });
        share.setShareInfo(config);
        // 修改全局window
        let mock = jest.fn();
        window.weixinUtil = {
            setWinxinConfig: mock
        };
        share.setShareInfo(config);

        // 非微信环境，无$jsBridge方法调用
        Object.defineProperties(navigator, {
            userAgent: {
                value: '',
                configurable: true,
                enumerable: true,
                writable: true
            }
        });
        share.setShareInfo(config);

        // 非微信环境，测试jsBridge方法调用
        window.$ljBridge.webStatus = {
            isLinkApp: true
        };
        share.setShareInfo(config);

        // 非微信环境，测试jsBridge方法调用
        window.$ljBridge.webStatus = {
            isLinkApp: true
        };
        share.setShareInfo(config);

        // 非微信环境，测试jsBridge方法调用
        window.$ljBridge.webStatus = {
            isDeyou: true
        };
        share.setShareInfo(config);
    });

    test('setJsbridgeShare', () => {
        // 没有检测到$ljBridge，是否正常shrow error
        // 我们必须使用一个函数将将被测试的函数做一个包装,否则会因为函数抛出导致该断言失败
        window.$ljBridge = null;
        function setJsbridgeShareFn() {
            share.setJsbridgeShare();
        }
        expect(setJsbridgeShareFn).toThrow('没有检测到$ljBridge');

        // 没有配置参数时，是否正常shrow error
        window.$ljBridge = {
            webStatus: {}
        };
        function setJsbridgeShareFn2() {
            share.setJsbridgeShare();
        }
        expect(setJsbridgeShareFn2).toThrow(errorTip);

        // 在link里，没有参数
        window.$ljBridge.webStatus = {
            isLinkApp: true
        };
        function setJsbridgeShareFn3() {
            share.setJsbridgeShare();
        }
        expect(setJsbridgeShareFn3).toThrow(errorTip);
        // 在link里，有参数
        window.$ljBridge.webStatus = {
            isLinkApp: true
        };
        window.$ljBridge.ready = function (callback) {
            // var bridge = {
            //     setRightButton: mock.fn(),
            //     setShareConfigWithString: mock.fn()
            // };
            callback && callback();
        };
        share.setJsbridgeShare(config);
        // 在deyou里，无参数
        window.$ljBridge.webStatus = {
            isDeyou: true
        };
        function setJsbridgeShareFn4() {
            share.setJsbridgeShare();
        }
        expect(setJsbridgeShareFn4).toThrow(errorTip);
        // 在deyou里，有参数
        window.$ljBridge.webStatus = {
            isDeyou: true
        };
        share.setJsbridgeShare(config);
    });

    test('actionShare', () => {
        function actionShareFn() {
            share.actionShare();
        }
        expect(actionShareFn).toThrow(errorTip);

        // 有配置，无jsbridge环境
        share.actionShare(config);

        // 有配置，有jsbridge环境
        window.$ljBridge = {
            webStatus: {}
        };
        window.$ljBridge.ready = function (callback) {
            callback && callback();
        };
        share.actionShare(config);

        window.$ljBridge.webStatus = {
            isLinkApp: true
        };
        share.actionShare(config);
        function actionShareFn2() {
            share.actionShare();
        }
        expect(actionShareFn2).toThrow(errorTip);

        window.$ljBridge.webStatus = {
            isDeyou: true
        };
        share.actionShare(config);
        function actionShareFn3() {
            share.actionShare();
        }
        expect(actionShareFn3).toThrow(errorTip);

        window.$ljBridge.webStatus = {
            isLinkApp: true
        };
        share.actionShare(config);
        function actionShareFn4() {
            share.actionShare();
        }
        expect(actionShareFn4).toThrow(errorTip);
    });
});
