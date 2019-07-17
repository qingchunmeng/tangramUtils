/**
 * @file cookie单元测试文件
 * @author mengqingchun002@ke.com
 * @date 2019/5/25 17:35
 */

import cookie from '../../src/util/cookie';

// console.log(cookie);

const {
    getSec,
} = cookie;
/* eslint-disable */
describe(getSec, () => {
    // 每个测试用例执行前都会还原数据，所以下面两个测试可以通过。
    beforeEach(() => {
        document.cookie = '';
    });

    test('getSec 1秒 为1000毫秒', () => {
        expect(getSec('s1')).toEqual(1000);
    });
    test('getSec 默认走的是秒的分支', () => {
        expect(getSec('3')).toEqual(3000);
    });
    test('getSec 1小时 为3600000毫秒', () => {
        expect(getSec('h1')).toEqual(3600000);
    });
    test('getSec 一天 为86400000毫秒', () => {
        expect(getSec('d1')).toBe(86400000);
    });


    test('getSec 1秒 为1000毫秒', () => {
        expect(getSec('s1')).toEqual(1000);
        expect(getSec('3')).toEqual(3000);
        expect(getSec('h1')).toEqual(3600000);
        expect(getSec('d1')).toBe(86400000);
    });

    test('setCookie 超时时间为50s', () => {
        function setCookie() {
            cookie.setCookie('name', 'testname', 's50');
            cookie.setCookie('sex', 'man');
            return document.cookie;
        }
        function removeCookie(name) {
            cookie.removeCookie(name);
            return document.cookie;
        }
        expect(setCookie()).toMatch('name=testname');
        expect(setCookie()).toMatch('sex=man');
        expect(cookie.checkCookie('name')).toBeTruthy();
        expect(cookie.checkCookie('age')).not.toBeTruthy();
        expect(cookie.checkCookie('age')).toBeFalsy();
        expect(cookie.getCookie('name')).toEqual('testname');
        expect(removeCookie('name')).toMatch('sex=man');
        expect(removeCookie('sex')).toEqual('');
        expect(removeCookie('age')).toEqual('');
        expect(getSec('s1')).toEqual(1000);
        expect(getSec('3')).toEqual(3000);
        expect(getSec('h1')).toEqual(3600000);
        expect(getSec('d1')).toBe(86400000);
        expect(getSec('m1')).toBe(1000);
        expect(getSec()).toBe(1000);
        // expect(getSec('m5')).toBe(5000);
    });
});
