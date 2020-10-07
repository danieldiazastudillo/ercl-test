import { FormControl, ValidatorFn } from '@angular/forms';

export function matchValidator(fieldName: string): ValidatorFn {
  let firstFormControl: FormControl;
  let secondFormControl: FormControl;

  // tslint:disable-next-line:no-shadowed-variable
  return function matchValidator(control: FormControl) {
    if (!control.parent) {
      return null;
    }

    if (!firstFormControl) {
      firstFormControl = control;
      secondFormControl = control.parent.get(fieldName) as FormControl;

      if (!secondFormControl) {
        throw new Error(`matchValidator(): Second Control not found in parent group.`);
      }

      secondFormControl.valueChanges.subscribe(() => {
        firstFormControl.updateValueAndValidity();
      });
    }

    if (!secondFormControl) {
      return null;
    }

    if (secondFormControl.value !== firstFormControl.value) {
      return {
        matchOther: true
      };
    }

    return null;
  };
}
