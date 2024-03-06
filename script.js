document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formValidation');
  const email = document.getElementById('email');
  const country = document.getElementById('country');
  const zip = document.getElementById('zip');
  const password = document.getElementById('password');
  const passwordConfirmation = document.getElementById('passwordConfirmation');

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      showError(
        email,
        'Please enter a valid email address (e.g., user@example.com)'
      );
      return false;
    } else {
      clearError(email);
      return true;
    }
  };

  const validateCountry = () => {
    const containsNumbers = /\d/.test(country.value);
    const isValidLength =
      country.value.length >= 4 && country.value.length <= 60;

    if (containsNumbers) {
      showError(country, 'Country name should not contain numbers.');
      return false;
    } else if (!isValidLength) {
      showError(country, 'Country name must be between 4 and 60 characters.');
      return false;
    } else {
      clearError(country);
      return true;
    }
  };

  const validateZip = () => {
    const zipPattern = /^\d{5}$/; // Regular expression for exactly 5 digits
    if (!zipPattern.test(zip.value)) {
      showError(zip, 'Please enter a valid 5-digit zip code, e.g., 34720.');
      return false;
    } else {
      clearError(zip);
      return true;
    }
  };

  const validatePassword = () => {
    // Regular expression to match the password criteria
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password.value)) {
      showError(
        password,
        'Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (e.g., Example1!).'
      );
      return false;
    } else {
      clearError(password);
      return true;
    }
  };

  const validatePasswordMatch = () => {
    if (password.value !== passwordConfirmation.value) {
      showError(passwordConfirmation, 'Passwords do not match');
      return false;
    } else {
      clearError(passwordConfirmation);
      return true;
    }
  };

  const showError = (input, message) => {
    const container = input.parentElement;
    const errorDisplay = container.querySelector('.error-message');
    errorDisplay.innerText = message;
    input.classList.add('invalid');
    input.classList.remove('valid');
  };

  const clearError = (input) => {
    const container = input.parentElement;
    const errorDisplay = container.querySelector('.error-message');
    errorDisplay.innerText = '';
    input.classList.add('valid');
    input.classList.remove('invalid');
  };

  const validateForm = () => {
    // Explicitly call all validation functions
    const isEmailValid = validateEmail();
    const isCountryValid = validateCountry();
    const isZipValid = validateZip();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmationValid = validatePasswordMatch();

    // If any validation fails, return false
    return (
      isEmailValid &&
      isCountryValid &&
      isZipValid &&
      isPasswordValid &&
      isPasswordConfirmationValid
    );
  };

  form.addEventListener('input', (event) => {
    // Validate individual field on input event
    switch (event.target) {
      case email:
        validateEmail();
        break;
      case country:
        validateCountry();
        break;
      case zip:
        validateZip();
        break;
      case password:
        validatePassword();
        break;
      case passwordConfirmation:
        validatePasswordMatch();
        break;
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert('High five! Form submitted successfully! 🖐️');
      form.reset();
    } else {
      alert('Please correct the errors in the form before submitting.');
    }
  });
});
