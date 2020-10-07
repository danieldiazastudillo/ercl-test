import { FormControl } from '@angular/forms';

// ^(\d{4})$/ string of only for DIGITS
export function pinValidator() {
  return function pinValidate(control: FormControl) {
    if (control.value.match(/^(\d{4})$/)) {
      return null;
    } else {
      return {
        invalidPassword: true
      };
    }
  };
}
