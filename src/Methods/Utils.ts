import Validation from './Validation';
import { IValidateFieldModel } from '../Interfaces/IValidateFormModel';

export default class Utils {
  public static validateForm(validateRules: string | string[], value: any) {
    const validate = new Validation(validateRules, value);
    return validate.checkRules() === '';
  }

  public static checkValidity(validField: IValidateFieldModel): [IValidateFieldModel, boolean] {
    const notValid = Object.values(validField).find((value) => value === false || value === null);

    if (notValid === undefined) return [validField, true];

    for (const prop in validField) validField[prop] = validField[prop] ? true : false;
    return [validField, false];
  }
}
