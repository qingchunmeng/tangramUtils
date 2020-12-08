import { trimAll, pascalCase } from '../../src/util/string';

describe('string', () => {
    test('trimAll', () => {
        expect(trimAll('abc')).toBe('abc');
        expect(trimAll('abc')).toBe('abc');
        expect(trimAll(' abc')).toBe('abc');
        expect(trimAll(' a bc')).toBe('abc');
        expect(trimAll(' a b c')).toBe('abc');
        expect(trimAll(' a b c ')).toBe('abc');
        expect(trimAll('  ')).toBe('');
    });

    test('pascalCase', () => {
        expect(pascalCase('foo bar')).toBe('FooBar');
        expect(pascalCase('Foo Bar')).toBe('FooBar');
        expect(pascalCase('fooBar')).toBe('FooBar');
        expect(pascalCase('FooBar')).toBe('FooBar');
        expect(pascalCase('--foo-bar--')).toBe('FooBar');
        expect(pascalCase('__FOO_BAR__')).toBe('FooBar');
        expect(pascalCase('!--foo-¿?-bar--121-**%')).toBe('FooBar121');
    });
});
