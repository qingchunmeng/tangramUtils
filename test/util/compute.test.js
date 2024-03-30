/**
 * @file params 单元测试文件
 */

import compute from '../../src/util/compute';

describe('debounce', () => {
    test('Compute [0.1, 0.1]', () => {
        expect(compute.add([0.1, 0.2], 2)).toEqual(0.3);
    });
    test('Compute [0.001, 0.001]', () => {
        expect(compute.add([0.001, 0.001], 2)).toEqual(0);
    });
    test('Compute [0.001, 0.005]', () => {
        expect(compute.add([0.001, 0.005], 2)).toEqual(0.01);
    });
    test('Compute [0.1, 0.2, 0.3], 2', () => {
        expect(compute.add([0.1, 0.2, 0.3], 2)).toEqual(0.6);
    });
    test('Compute [0.01, 0.03], 2', () => {
        expect(compute.add([0.01, 0.03], 2)).toEqual(0.04);
    });
    test('Compute [0.01, 0.3], 2', () => {
        expect(compute.add([0.01, 0.3], 2)).toEqual(0.31);
    });
    test('Compute [0.3, 0.1], 2', () => {
        expect(compute.subtract([0.3, 0.1], 2)).toEqual(0.2);
    });
    test('Compute [0.2, 0.1, 0.01], 2', () => {
        expect(compute.subtract([0.2, 0.1, 0.01], 2)).toEqual(0.09);
    });
    test('Compute [0.008, 0.09], 2', () => {
        expect(compute.subtract([0.008, 0.09], 2)).toEqual(-0.08);
    });
    test('Compute [0.008, 0.009], 2', () => {
        expect(compute.subtract([0.008, 0.009], 2)).toEqual(-0.0);
    });
    test('Compute [0.008, 0.09], 3', () => {
        expect(compute.subtract([0.008, 0.09], 3)).toEqual(-0.082);
    });
    test('Compute [0.008, 0.09], 2', () => {
        expect(compute.subtract([0.008, 0.009], 2)).toEqual(-0.0);
    });
});
