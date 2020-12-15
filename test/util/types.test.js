import { isUniq, isNullOrUndefined, isEmptyString, isEmptyValue } from '../../src/util/types';

describe('types', () => {
    test('isUniq', () => {
        expect(isUniq()).toBeTruthy();
        expect(isUniq([1, '1'])).toBeTruthy();
        expect(isUniq([1, 1])).toBeFalsy();
    });
    test('isNullOrUndefined', () => {
        expect(isNullOrUndefined(null)).toBeTruthy();
        expect(isNullOrUndefined(undefined)).toBeTruthy();
        expect(isNullOrUndefined('')).toBeFalsy();
    });

    test('isEmptyString', () => {
        expect(isEmptyString('')).toBeTruthy();
        expect(isEmptyString(null)).toBeFalsy();
        expect(isEmptyString(undefined)).toBeFalsy();
        expect(isEmptyString(' ')).toBeFalsy();
        expect(isEmptyString('1')).toBeFalsy();
    });

    test('isEmptyValue', () => {
        expect(isEmptyValue('')).toBeTruthy();
        expect(isEmptyValue(null)).toBeTruthy();
        expect(isEmptyValue(undefined)).toBeTruthy();
        expect(isEmptyValue(' ')).toBeFalsy();
        expect(isEmptyValue('1')).toBeFalsy();
    });
});
