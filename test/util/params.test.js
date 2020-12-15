/**
 * @file params 单元测试文件
 * @author zhangwenjie009@ke.com
 * @date 2019/6/27 08:00
 */

import params, { queryParse, queryStringify } from '../../src/util/params';

const { getParams, getQuery, getSearch } = params;

describe('debounce', () => {
    test('getParams ?tab=zaitudan&key=123', () => {
        expect(getParams('?tab=zaitudan&key=123')).toEqual({
            tab: 'zaitudan',
            key: '123'
        });
    });
    test('getParams ?tab=zaitudan&key', () => {
        expect(getParams('?tab=zaitudan&key')).toEqual({
            tab: 'zaitudan',
            key: ''
        });
    });
    test('getSearch { tab: "zaitudan", key: 123 }', () => {
        expect(
            getSearch({
                tab: 'zaitudan',
                key: 123
            })
        ).toEqual('?tab=zaitudan&key=123');
    });
    test('getSearch { a: false, b: 3 }', () => {
        expect(getSearch({ a: undefined, b: 3 })).toEqual('?a=&b=3');
    });
    test('getSearch {}', () => {
        expect(getSearch({})).toEqual('');
    });
    test('getQuery', () => {
        expect(getQuery()).toEqual({});
    });

    test('queryParse', () => {
        expect(queryParse()).toEqual({});
        expect(queryParse('')).toEqual({});
        expect(queryParse('?')).toEqual({});
        expect(queryParse('?a')).toEqual({ a: null });
        expect(queryParse('?a=1')).toEqual({ a: '1' });
        expect(queryParse('a=1')).toEqual({ a: '1' });
        expect(queryParse('a=true')).toEqual({ a: 'true' });
        expect(queryParse('a=1&b')).toEqual({ a: '1', b: null });
        expect(queryParse('a=1&b=2')).toEqual({ a: '1', b: '2' });
        expect(queryParse('a=1&b&c')).toEqual({ a: '1', b: null, c: null });
        expect(queryParse('a=1&b=2&c&d=2&d=3')).toEqual({ a: '1', b: '2', c: null, d: ['2', '3'] });
        expect(queryParse('a=1&b=2&c&d=2&d=3&d')).toEqual({ a: '1', b: '2', c: null, d: ['2', '3', null] });
    });

    test('queryStringify', () => {
        expect(queryStringify()).toBe('');
        expect(queryStringify(null)).toBe('');
        expect(queryStringify({})).toBe('');
        expect(queryStringify({ a: 1 })).toBe('a=1');
        expect(queryStringify({ a: '1' })).toBe('a=1');
        expect(queryStringify({ a: 1, b: 2 })).toBe('a=1&b=2');
        expect(queryStringify({ a: 1, b: null })).toBe('a=1&b');
        expect(queryStringify({ a: 1, b: null, c: null })).toBe('a=1&b&c');
        expect(queryStringify({ a: 1, b: undefined, c: null })).toBe('a=1&c');
        expect(queryStringify({ a: true })).toBe('a=true');
        expect(queryStringify({ a: true, b: false })).toBe('a=true&b=false');
        expect(queryStringify({ a: 1, b: 2, c: null, d: [2, 3] })).toBe('a=1&b=2&c&d=2&d=3');
        expect(queryStringify({ a: 1, b: 2, c: null, d: [2, undefined, 3, null] })).toBe('a=1&b=2&c&d=2&d=3&d');
    });
});
