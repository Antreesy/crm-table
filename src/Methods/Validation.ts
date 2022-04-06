import { IRules, IRulesValue, rulesArray } from '../Shared/const/validationRules';

class Validation {
  public rule: IRules | null = null;

  public validValue = '';

  public isRequired = false;

  constructor(fields: string | string[], value: string | number | boolean) {
    this.validValue = !!value ? value.toString() : '';
    this.rule = this.getRules(fields);

    try {
      this.isRequired = !!this.rule?.required.value;
    } catch (e) {
      if (e instanceof Error && e.name !== 'TypeError') console.log(e);
    }
  }

  private getRules(fields: string | string[]): IRules | null {
    const rulesComb: { [key: string]: IRulesValue } = {};

    const ruleFields = typeof fields === 'string' ? [fields] : fields;

    try {
      for (const field of ruleFields) {
        const getField = rulesArray.find((element) => element.field === field);

        if (!getField) return null;

        for (const rule of Object.keys(getField.rules)) {
          rulesComb[rule] = getField.rules[rule];
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      return rulesComb;
    }
  }

  public checkRules(): string {
    if (!this.rule) return '';

    if (this.rule.required && !!this.checkRequired()) return this.checkRequired().toString();
    if (this.rule.minLength && !!this.checkMinLength()) return this.checkMinLength().toString();
    if (this.rule.minLength && !!this.checkMaxLength()) return this.checkMaxLength().toString();
    if (this.rule.isName && !!this.checkName()) return this.checkName().toString();
    if (this.rule.isEmail && !!this.checkEmail()) return this.checkEmail().toString();

    return '';
  }

  // TODO проверить работу ColorPicker, не принимает белый цвет по умолчанию
  private checkRequired() {
    if (!this.rule || this.validValue) return '';

    return this.rule.required.message;
  }

  private checkMinLength() {
    if (!this.rule || this.rule.minLength.value <= this.validValue.length) return '';

    return `${this.rule.minLength.message} - ${this.rule.minLength.value} символа`;
  }

  private checkMaxLength() {
    if (!this.rule || this.rule.maxLength.value >= this.validValue.length) return '';

    return `${this.rule.maxLength.message} - ${this.rule.maxLength.value} символа`;
  }

  private checkName() {
    const nameRegExp =
      /\s/;

    if (!this.rule || !nameRegExp.test(this.validValue)) return '';

    return this.rule.isName.message;
  }

  private checkEmail() {
    const emailRegExp =
      /[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i;

    if (!this.rule || emailRegExp.test(this.validValue)) return '';

    return this.rule.isEmail.message;
  }
}

export default Validation;
