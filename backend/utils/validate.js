const validateEmail = (email) => {
  if (!email) return false;
  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');
  if (atIndex < 1) return false;
  if (dotIndex < atIndex + 2) return false;
  if (dotIndex === email.length - 1) return false;
  return true;
};

const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 6;
};

module.exports = { validateEmail, validatePassword };
