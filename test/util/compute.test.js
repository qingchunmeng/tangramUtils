/**
 * @file params 单元测试文件
 * @author lihaixu@ke.com
 * @date 2019/9/17 15:53
 */

import Compute from '../../src/util/compute';

describe('debounce', () => {
    test('getParams 0.1 + 0.1', () => {
        expect(Compute.add([0.1, 0.2], 2)).toEqual(0.3);
    });
    test('getSearch 0.1 + 0.2 + 0.3 ', () => {
        expect(Compute.add([0.1, 0.2, 0.3], 2)).toEqual(0.6);
    });
    test('getParams 0.2 - 0.1', () => {
        expect(Compute.subtract([0.3, 0.1], 2)).toEqual(0.2);
    });
    test('getSearch 0.2 - 0.1 - 0.01 ', () => {
        expect(Compute.subtract([0.2, 0.1, 0.01], 2)).toEqual(0.09);
    });
});
