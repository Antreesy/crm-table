export interface IValidateFieldModel {
  [key: string]: boolean | null;
}

export interface IValidateRulesModel {
  [key: string]: string | string[];
}

export interface IValidateFormModel {
  isValid: boolean | null;
  validField: IValidateFieldModel;
  validRules: IValidateRulesModel;
}
