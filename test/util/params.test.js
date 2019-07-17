/**
 * @file params 单元测试文件
 * @author zhangwenjie009@ke.com
 * @date 2019/6/27 08:00
 */

import params from '../../src/util/params';

describe('debounce', () => {
    test('getParams ?tab=zaitudan&key=123', () => {
        expect(params.getParams('?tab=zaitudan&key=123')).toEqual({
            tab: 'zaitudan',
            key: '123',
        });
    });
    test('getParams ?tab=zaitudan&key', () => {
        expect(params.getParams('?tab=zaitudan&key')).toEqual({
            tab: 'zaitudan',
            key: '',
        });
    });
    test('getSearch { tab: "zaitudan", key: 123 }', () => {
        expect(params.getSearch({
            tab: 'zaitudan',
            key: 123,
        })).toEqual('?tab=zaitudan&key=123');
    });
    test('getSearch { a: false, b: 3 }', () => {
        expect(params.getSearch({ a: undefined, b: 3 })).toEqual('?a=&b=3');
    });
    test('getSearch {}', () => {
        expect(params.getSearch({})).toEqual('');
    });
    test('getQuery', () => {
        expect(params.getQuery()).toEqual({});
    });
});
