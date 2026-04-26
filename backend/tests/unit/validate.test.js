const { validateEmail, validatePassword } = require('../../utils/validate');

describe('Validation Utils - Unit Tests', () => {
  describe('validateEmail', () => {
    test('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co')).toBe(true);
    });

    test('should return false for invalid email', () => {
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('missing@')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('should return true for valid password (min 6 chars)', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('abc123')).toBe(true);
    });

    test('should return false for short password', () => {
      expect(validatePassword('abc')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });
});
