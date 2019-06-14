
import obj from '../../src/util/validate';

/* eslint-disable */
describe('validate', () => {
    // 每个测试用例执行前都会还原数据，所以下面两个测试可以通过。
    
    test('isEmpty', () => {
        expect(obj.isEmpty()).toBeTruthy();
        expect(obj.isEmpty('')).toBeTruthy();
        expect(obj.isEmpty(null)).toBeTruthy();
        expect(obj.isEmpty(undefined)).toBeTruthy();
        expect(!obj.isEmpty(' ')).toBeTruthy();
        expect(!obj.isEmpty('123')).toBeTruthy();
        expect(!obj.isEmpty(123)).toBeTruthy();
        expect(!obj.isEmpty([])).toBeTruthy();
        expect(!obj.isEmpty({})).toBeTruthy();
    });

    test('isMobile', () => {
        expect(!obj.isMobile()).toBeTruthy();
        expect(!obj.isMobile('')).toBeTruthy();
        expect(!obj.isMobile(null)).toBeTruthy();
        expect(!obj.isMobile(undefined)).toBeTruthy();
        expect(!obj.isMobile(' ')).toBeTruthy();
        expect(!obj.isMobile('123')).toBeTruthy();
        expect(!obj.isMobile(123)).toBeTruthy();
        expect(!obj.isMobile([])).toBeTruthy();
        expect(!obj.isMobile({})).toBeTruthy();
        expect(!obj.isMobile(22345678901)).toBeTruthy();
        expect(!obj.isMobile(123456789012)).toBeTruthy();
        expect(obj.isMobile(12345678901)).toBeTruthy();
        expect(obj.isMobile('12345678901')).toBeTruthy();
        expect(!obj.isMobile(' 12345678901')).toBeTruthy();
    });

    test('isWeiXin isAndroid isIOS', () => {
        expect(!obj.isWeiXin()).toBeTruthy();
        expect(!obj.isAndroid()).toBeTruthy();
        expect(!obj.isIOS()).toBeTruthy();
        // 修改ua
        let ua = 'Mozilla/5.0 (Linux; Android 5.1; HUAWEI TAG-AL00 Build/HUAWEITAG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043622 Safari/537.36 MicroMessenger/6.6.1.1220(0x26060135) NetType/4G Language/zh_CN';
        Object.defineProperties(navigator, {
            userAgent: {
                value: ua,
                configurable: true,
                enumerable: true,
                writable: true
            }
        });
        expect(obj.isWeiXin()).toBeTruthy();
        expect(obj.isAndroid()).toBeTruthy();
        expect(!obj.isIOS()).toBeTruthy();
        navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B150 MicroMessenger/6.6.1 NetType/WIFI Language/zh_CN';
        expect(obj.isWeiXin()).toBeTruthy();
        expect(!obj.isAndroid()).toBeTruthy();
        expect(obj.isIOS()).toBeTruthy();
    });

    test('isWindow', () => {
        expect(!obj.isWindow({})).toBeTruthy();
        expect(!obj.isWindow(document)).toBeTruthy();
        expect(!obj.isWindow(document.createElement('div'))).toBeTruthy();
        expect(obj.isWindow(window)).toBeTruthy();
    });

});
