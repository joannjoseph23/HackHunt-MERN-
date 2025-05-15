const hackathons = require('./hackathons');

test('should contain at least one hackathon', () => {
  expect(hackathons.length).toBeGreaterThan(0);
});

test('each hackathon has name and link', () => {
  hackathons.forEach(h => {
    expect(h).toHaveProperty('name');
    expect(h).toHaveProperty('link');
  });
});
