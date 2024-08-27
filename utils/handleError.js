const handleErrors = (err) => {
    let errors = { email: '', password: '' };
  
    // Validation errors
    if (err.message.includes('User validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    // Duplicate email error
    if (err.code === 11000) {
      errors.email = 'Email is already registered';
    }
  
    // Incorrect password or email
    if (err.message === 'Invalid password' || err.message === 'Invalid email') {
      errors.password = err.message;
    }
  
    return errors;
  };
  
  module.exports = handleErrors;
  