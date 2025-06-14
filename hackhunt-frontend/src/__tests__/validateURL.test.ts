import { isValidURL } from '../../utils/validate';

describe('Hackathon URL validation', () => {
  it('accepts valid URLs', () => {
    expect(isValidURL('https://devfolio.co')).toBe(true);
    expect(isValidURL('http://hackathon.org')).toBe(true);
  });

  it('rejects invalid URLs', () => {
    expect(isValidURL('devfolio')).toBe(false);
    expect(isValidURL('http:/invalid')).toBe(false);
  });
});
