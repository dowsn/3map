const validateRegisterInput = (username, email, password, confirmPassword) => {

  const errors = {}; // empty object
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.password = 'Passwords do not match';
    errors.confirmPassword = 'Passwords do not match';
    };

  let mailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === '') {
      errors.email = 'Email must not be empty';
  } else if  (!email.match(mailRegEx)) {
    errors.email = 'Email must be a valid email address';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

const validateLoginInput = (username, password) => {
  const errors = {}; // empty object

  if (username === '') {
    errors.username = 'Username must not be empty';
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export { validateLoginInput, validateRegisterInput };