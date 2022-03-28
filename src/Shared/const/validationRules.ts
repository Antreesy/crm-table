enum ValidationErrors {
  RequiredField = 'Это обязательное поле',
  Email = 'E-mail введён некорректно',
  MinLength = 'Минимальная длина поля',
  MaxLength = 'Максимальная длина поля',
}

export interface IRules {
  [key: string]: {
    value: string | number | boolean;
    message: ValidationErrors;
  };
}

interface IField {
  field: string;
  rules: IRules;
}

const rulesArray: IField[] = [
  {
    field: 'required',
    rules: {
      required: {
        value: true,
        message: ValidationErrors.RequiredField,
      },
    },
  },

  {
    field: 'length',
    rules: {
      minLength: {
        value: 2,
        message: ValidationErrors.MinLength,
      },
      maxLength: {
        value: 128,
        message: ValidationErrors.MaxLength,
      },
    },
  },

  {
    field: 'fullName',
    rules: {},
  },

  {
    field: 'eMail',
    rules: {
      isEmail: {
        value: true,
        message: ValidationErrors.Email,
      },
    },
  },
];

export { rulesArray };
