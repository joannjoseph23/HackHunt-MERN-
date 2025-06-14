import { isValidDateRange } from '../../utils/validate';

describe('isValidDateRange', () => {
  it('returns true for valid date range', () => {
    expect(isValidDateRange('Apr 25 2025 - May 17 2025')).toBe(true);
  });

  it('returns false when end date is before start date', () => {
    expect(isValidDateRange('May 17 2025 - Apr 25 2025')).toBe(false);
  });

  it('returns false for invalid input', () => {
    expect(isValidDateRange('OnlyOneDate')).toBe(false);
  });
});
