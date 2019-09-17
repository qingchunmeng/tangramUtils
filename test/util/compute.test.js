/**
 * @file params 单元测试文件
 * @author lihaixu@ke.com
 * @date 2019/9/17 15:53
 */

import Compute from '../../src/util/compute';

describe('debounce', () => {
    test('Compute [0.1, 0.1]', () => {
        expect(Compute.add([0.1, 0.2], 2)).toEqual(0.30);
    });
    test('Compute [0.1, 0.2, 0.3], 2', () => {
        expect(Compute.add([0.1, 0.2, 0.3], 2)).toEqual(0.60);
    });
    test('Compute [0.01, 0.03], 2', () => {
        expect(Compute.add([0.01, 0.03], 2)).toEqual(0.04);
    });
    test('Compute [0.01, 0.3], 2', () => {
        expect(Compute.add([0.01, 0.3], 2)).toEqual(0.31);
    });
    test('Compute [0.3, 0.1], 2', () => {
        expect(Compute.subtract([0.3, 0.1], 2)).toEqual(0.20);
    });
    test('Compute [0.2, 0.1, 0.01], 2', () => {
        expect(Compute.subtract([0.2, 0.1, 0.01], 2)).toEqual(0.09);
    });
    test('Compute [0.008, 0.09], 2', () => {
        expect(Compute.subtract([0.008, 0.09], 2)).toEqual(-0.08);
    });
    test('Compute [0.008, 0.009], 2', () => {
        expect(Compute.subtract([0.008, 0.009], 2)).toEqual(-0.00);
    });
    test('Compute [0.008, 0.09], 3', () => {
        expect(Compute.subtract([0.008, 0.09], 3)).toEqual(-0.082);
    });
    test('Compute [0.008, 0.09], 3', () => {
        expect(Compute.subtract([0.008, 0.009], 2)).toEqual(-0.00);
    });
});
