import { isValidDateRange } from '../../utils/validateDateRange';

describe('isValidDateRange', () => {
  it('returns true for valid date range', () => {
    const input = 'Apr 25 2025 - May 17 2025';
    expect(isValidDateRange(input)).toBe(true);
  });

  it('returns false when end date is before start date', () => {
    const input = 'May 17 2025 - Apr 25 2025';
    expect(isValidDateRange(input)).toBe(false);
  });

  it('returns false for invalid input', () => {
    const input = 'OnlyOneDate';
    expect(isValidDateRange(input)).toBe(false);
  });
});
