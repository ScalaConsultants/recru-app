import Validation from './lib/validation';
// import ValidationError from './lib/ValidationError';

// Localized validation.
export default function validate(state) {

  // // Example of localized validation
  // const intl = state.intl;
  // const msg = intl.messages[intl.selectedLanguage];
  //
  // class LocalizedValidation extends Validation {
  //   getRequiredMessage(prop) {
  //     return format(msg.auth.validation.required, {prop});
  //   }
  //
  //   getEmailMessage(prop) {
  //     return format(msg.auth.validation.email, {prop});
  //   }
  //
  //   getSimplePasswordMessage(minLength) {
  //     return format(msg.auth.validation.password, {minLength});
  //   }
  // }

  const validate = (object) => new Validation(object);

  // // Example of validator
  // validate.wrongPassword = prop =>
  //   new ValidationError(msg.auth.form.wrongPassword, prop);

  return validate;

}
