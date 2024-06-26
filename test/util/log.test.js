/**
 * @file log 单元测试文件
 */

import {
    Log,
    getDateString,
    getErrorStack,
    paddingString,
    parseDateStringTpl,
    parseKeyTpl,
    isEmpty
} from '../../src/util/log';

describe('log Log', () => {
    // 简单模拟 console 输出

    function toString(...args) {
        return args.reduce((init, curr) => (init += curr), '');
    }

    Log.dt = {
        // mock
        notify: toString
    };
    Log.env = 'test';
    const log = new Log({
        console: {
            // mock
            log: toString,
            info: toString,
            warn: toString,
            error: toString
        },
        preText: 'test log'
    });
    test('Log', () => {
        expect(log.log('123456')).toContain('%ctest log <log>');
        expect(log.info('123456')).toContain('%ctest log <info>');
        expect(log.warn('123456')).toContain('%ctest log <warn>');
        expect(log.error('123456')).toContain('%ctest log <error>');
        expect(log.error('123456', 'abcdef')).toContain('123456abcdef');
        expect(log.notify('errorName', 'url', 'extraInfo')).toContain('errorNameurlextraInfo');
        Log.dt = null;
        expect(log.notify('errorName', 'url', 'extraInfo')).toContain('dt notify 不可用');

        const newInstance = log.getNewInstance({ preText: 'NewInstance preText' });
        newInstance.setEnv('selfEnv');
        expect(newInstance.getEnv()).toEqual('selfEnv');
        expect(newInstance.log('123456')).toContain('NewInstance preText');
    });
});

describe('log isEmpty', () => {
    test('isEmpty', () => {
        expect(isEmpty('')).toBeTruthy();
        expect(isEmpty(undefined)).toBeTruthy();
        expect(isEmpty(null)).toBeTruthy();
        expect(isEmpty(0)).toBeFalsy();
        expect(isEmpty('abc')).toBeFalsy();
    });
});

describe('log paddingString', () => {
    test('paddingString', () => {
        expect(paddingString('   1   ')).toEqual('1');
        expect(paddingString(1, 3)).toEqual('001');
        expect(paddingString(1, 3, 'x')).toEqual('xx1');
        expect(paddingString(1, 5, 'abc', true)).toEqual('1abca');
    });
});

describe('log getErrorStack', () => {
    test('getErrorStack', () => {
        expect(getErrorStack('errMsg')).toEqual('errMsg');
        expect(getErrorStack({ message: 'errMsg' })).toEqual('errMsg');
        expect(getErrorStack({ msg: 'errMsg' })).toEqual('{"msg":"errMsg"}');
        expect(getErrorStack([1, 2])).toEqual('[1,2]');
        expect(getErrorStack({ error: { stack: 'errMsg' } })).toEqual('errMsg');
        expect(getErrorStack({ stack: 'errMsg' })).toEqual('errMsg');
        expect(getErrorStack({ inspect: () => 'errMsg' })).toEqual('errMsg');
        expect(getErrorStack(new Error('errMsg'))).toContain(`Error: errMsg`);
        expect(getErrorStack(new Error('errMsg'))).toContain(`/Tangram/test/util/log.test.js`);
        try {
            undefinedVar++;
        } catch (e) {
            expect(getErrorStack(e)).toContain(`ReferenceError: undefinedVar is not defined`);
            expect(getErrorStack(e)).toContain(`/Tangram/test/util/log.test.js`);
        }
    });
});

const testDateArr = [2020, 12, 11, '09', 36, 30, 168];
const testDate = new Date(2020, 11, 11, 9, 36, 30, 168);
const timeStr = '2020-12-11 09:36:30.168';

describe('log parseDateStringTpl', () => {
    test('parseDateStringTpl', () => {
        const d = [2020, 12, 11, '09', 36, 30, 168];
        expect(parseDateStringTpl('y-M-d h:mm:ss.ms', testDateArr)).toEqual(timeStr);
        expect(parseDateStringTpl('yYyy-MM-dddd h:mm:ss.ms', testDateArr)).toEqual(timeStr);
        expect(parseDateStringTpl('h:mm:ss.ms', testDateArr)).toEqual('09:36:30.168');
    });
});

describe('log parseKeyTpl', () => {
    test('parseKeyTpl', () => {
        expect(parseKeyTpl('${0}-${1}-${2} ${3}:${4}:${5}.${6}', testDateArr)).toEqual(timeStr);
        expect(parseKeyTpl('${porp1}-${porp2}', { porp1: 'porp1 value', porp2: 'porp2 value' })).toEqual(
            'porp1 value-porp2 value'
        );
    });
});

describe('log getDateString', () => {
    test('getDateString', () => {
        expect(getDateString('y-M-d h:mm:ss.ms', testDate)).toEqual(timeStr);
        expect(getDateString('yyyy-MM-dd hh:mm:ss.ms', testDate.getTime())).toEqual(timeStr);
        expect(getDateString('y年M月d日', testDate.getTime())).toEqual('2020年12月11日');
        expect(getDateString('${1}月${2}日 ${3}时', testDate.getTime())).toEqual('12月11日 09时');
        expect(getDateString(args => `${args[1]}月${args[2]}日 ${parseInt(args[3])}时`, testDate.getTime())).toEqual(
            '12月11日 9时'
        );
    });
});
