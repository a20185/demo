import Locale from '../../../src/utils/locale';


test('Locale Setting Worked', () => {
    expect(Locale.use('ZH_HANS')).toBe("ZH_HANS");
});

test('Locale Format translation do nothing on none property', () => {
    expect(Locale.t('el.color')).toBe('');
});

test('Locale should Compiles translation correctly', () => {
    expect(Locale.t('el.pagination.total', [{'total': '15'}])).toBe('共 15 条');
});
