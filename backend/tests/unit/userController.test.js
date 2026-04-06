const { validateEmail } = require('../../utils/validate');

describe('validateEmail', () => {
  test('normal email should work', () => {
    expect(validateEmail('devendra@gmail.com')).toBe(true);
  });

  test('no @ means invalid', () => {
    expect(validateEmail('devendragmail.com')).toBe(false);
  });

  test('no dot after @ means invalid', () => {
    expect(validateEmail('devendra@gmailcom')).toBe(false);
  });

  test('empty string should fail', () => {
    expect(validateEmail('')).toBe(false);
  });
});
