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
