// Notice the export statement and the import in home.js
// Notice the structure of the parameter and the return value
export default function validateRegistrationForm(formValues) {

  const result = {
    username: validateUserName(formValues.username),
    email: validateEmail(formValues.email),
    phone: validatePhone(formValues.phone),
    age: validateAge(formValues.age),
    profession: validateProfession(formValues.profession),
    experience: validateExperience(formValues.experience),
  };

  let field, isValid = true;
  for(field in result) {
    isValid = isValid && result[field];
  }

  return {
    isValid,
    result,
  };

}

// must be longer than 3 chars.  Use a regular expression.
function validateUserName(name) {
  const pattern = /^[a-zA-Z -]{3,}$/;
  return pattern.test(name);
}

// must be a valid email address.  Use a regular expression
function validateEmail(email) {
  const pattern = /^\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,8}$/;
  return pattern.test(email);
}

// must be a valid 10 digit phone number.  Use a regular expression
function validatePhone(phone) {
  const pattern = /^\d{3}[\s.\-]?\d{3}[\s.\-]?\d{4}$/;
  return pattern.test(phone);
}

// must be between 10 and 25 inclusive.  Use a regular expression
// to make sure that the age is a 2 digit number before checking the range.
function validateAge(age) {
  const pattern = /^(1[\d]|2[0-5]){1}$/;
  return pattern.test(age);
}

// must be either school, college, trainee or employee.  No reg exp.
function validateProfession(profession) {
  switch(profession) {
    case 'school':
    case 'college':
    case 'trainee':
    case 'employee':
      return true;
    default:
      return false;
  }
}

// must be between 0 and 4 years exclusive.  Use a regular expression.
function validateExperience(experience) {
  const pattern = /^[1-3]{1}$/;
  return pattern.test(experience);
}