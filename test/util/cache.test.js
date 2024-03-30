/**
 * @file cookie单元测试文件
 */

import cache from '../../src/util/cache';

const { get, set, remove, getFromSession, setToSession, removeFromSession } = cache;

describe('localStorage测试', () => {
    const testKey = `test_key_${Math.random()}`;
    const testValue = `test_value_${Math.random()}`;

    beforeEach(() => {
        remove(testKey);
    });

    test('获取localStorage中的值', () => {
        set(testKey, testValue);
        expect(get(testKey)).toEqual(testValue);
    });

    test('清空localStorage中的值', () => {
        set(testKey, testValue);
        remove(testKey);
        expect(get(testKey)).toBeNull();
    });
});

describe('sessionStorage测试', () => {
    const testSessionKey = `test_session_key_${Math.random()}`;
    const testSessionValue = `test_session_value_${Math.random()}`;

    beforeEach(() => {
        removeFromSession(testSessionKey);
    });

    test('获取localStorage中的值', () => {
        setToSession(testSessionKey, testSessionValue);
        expect(getFromSession(testSessionKey)).toEqual(testSessionValue);
    });

    test('清空localStorage中的值', () => {
        setToSession(testSessionKey, testSessionValue);
        removeFromSession(testSessionKey);
        expect(getFromSession(testSessionKey)).toBeNull();
    });
});
