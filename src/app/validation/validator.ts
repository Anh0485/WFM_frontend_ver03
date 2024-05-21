import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    console.log('Validator is running');
  if (control instanceof FormGroup) {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateRangeInvalid: true };
    }
  }

  return null;
};

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) {
    return null; 
  }

  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const valid = regex.test(control.value);
  return valid ? null : { emailInvalid: true };
};
