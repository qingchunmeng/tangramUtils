import { getParams, search, stringifyUrl, linkTo, parseUrl, getFullUrl } from '../../src/util/route';

describe('route', () => {
    test('getParams', () => {
        expect(getParams('?a=1', 'a')).toBe('1');
        expect(getParams('?a=1&b=2', 'b')).toBe('2');
    });

    test('search', () => {
        expect(search()).toEqual({});
        expect(search('a')).toBe(undefined);
    });

    test('stringifyUrl', () => {
        expect(stringifyUrl('aa', { a: 1, b: 2 })).toBe('aa?a=1&b=2');
    });

    test('linkTo', () => {
        expect(linkTo('aa', {})).toBe(undefined);
    });

    test('parseUrl', () => {
        expect(parseUrl('aa').pathname).toBe('/aa');
    });

    test('getFullUrl', () => {
        expect(getFullUrl('aa').pathname).toBe(undefined);
    });
});
