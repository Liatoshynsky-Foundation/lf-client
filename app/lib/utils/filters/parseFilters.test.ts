import { parseFilters } from './parseFilters';

describe('parseFilters - comprehensive parsing flow verification', () => {
  const currentYear = new Date().getFullYear();

  it('should return min/max from valid yearFrom and yearTo', () => {
    const params = new URLSearchParams({ yearFrom: '1990', yearTo: '2000' });
    const res = parseFilters(params);
    expect(res).toBeDefined();
    expect(res.years).toEqual({ min: 1990, max: 2000 });
  });

  it('should default min to 1900 when yearFrom missing', () => {
    const params = new URLSearchParams({ yearTo: '2010' });
    const res = parseFilters(params);
    expect(res).toBeDefined();
    expect(res.years).toEqual({ min: 1900, max: 2010 });
  });

  it('should default max to current year when yearTo missing', () => {
    const params = new URLSearchParams({ yearFrom: '2005' });
    const res = parseFilters(params);
    expect(res).toBeDefined();
    expect(res.years).toEqual({ min: 2005, max: currentYear });
  });

  it('should clamp yearFrom to >= 1900 and yearTo to <= current year', () => {
    const params = new URLSearchParams({ yearFrom: '1700', yearTo: String(currentYear + 5) });
    const res = parseFilters(params);
    expect(res).toBeDefined();
    expect(res.years).toEqual({ min: 1900, max: currentYear });
  });

  it('should swap min/max when yearFrom > yearTo', () => {
    const params = new URLSearchParams({ yearFrom: '2020', yearTo: '2000' });
    const res = parseFilters(params);
    expect(res).toBeDefined();
    expect(res.years).toEqual({ min: 2000, max: 2020 });
  });

  it('should treat non-numeric values as missing and use defaults', () => {
    const params = new URLSearchParams({ yearFrom: 'abc', yearTo: 'def' });
    const res = parseFilters(params);
    expect(res).toBeDefined();
    expect(res.years).toEqual({ min: 1900, max: currentYear });
  });

  it('should return empty filters object when neither year nor other filters are present', () => {
    const params = new URLSearchParams('');
    const res = parseFilters(params);
    expect(res).toEqual({ categories: [], author: [], years: { min: 1900, max: currentYear }, search: '' });
  });

  it('should extract array configuration lists correctly when multi parameter keys are supplied inside the query text stream', () => {
    const params = new URLSearchParams();
    params.append('category', 'classic');
    params.append('author', 'liatoshynsky');
    params.append('search', 'symphony');

    const res = parseFilters(params);

    expect(res.categories).toEqual(['classic']);
    expect(res.author).toEqual(['liatoshynsky']);
    expect(res.search).toBe('symphony');
  });
});
