import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function usernameValidator(): ValidatorFn {
  const regex = /^[a-zA-Z0-9_]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return regex.test(value) ? null : {invalidUsername: true};
  };
}
