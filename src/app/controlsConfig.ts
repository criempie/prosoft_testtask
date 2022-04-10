import { controlsConfigInterface, inputTypes } from "../types/types";

export const REQUIRED = () => 'Поле обязательно';
export const MAX_LENGTH = (length: number | string) => `Максимальная длина ${ length }`;
export const EQUAL_LENGTH = (length: number | string) => `Необходима длина ${ length }`;

export const controlsConfig: controlsConfigInterface = {
  id: {
    initValue: null,
    type: inputTypes.id,
    hidden: true
  },
  name: {
    initValue: '',
    type: inputTypes.inputtext,
    validator: function (control) {
      const value = control.value;
      const errors: { [key: string]: string } = {};

      if (!value) errors['required'] = REQUIRED();
      if (value.length > 255) errors['maxLength'] = MAX_LENGTH(255);

      if (Object.keys(errors).length === 0) return null
      else return errors

    },
    inputTitle: 'Имя',
    inputPlaceholder: 'Введите имя...'
  },
  type: {
    initValue: null,
    type: inputTypes.select,
    selectOptions: [
      {
        title: 'Физическое лицо',
        value: 1
      },
      {
        title: 'Юридическое лицо',
        value: 2
      }
    ],
    validator: function (control) {
      const value = control.value;
      const errors: { [key: string]: string } = {};

      if (!value) errors['required'] = REQUIRED();

      if (Object.keys(errors).length === 0) return null
      else return errors
    },
    inputTitle: 'Тип',
  },
  number: {
    initValue: '',
    type: inputTypes.inputtext,
    inputType: 'number',
    validator: function (control) {
      const value = control.value;
      const errors: { [key: string]: string } = {};

      if (!value) errors['required'] = REQUIRED();
      if (value.toString().length !== 13) errors['equalLength'] = EQUAL_LENGTH(13);

      if (Object.keys(errors).length === 0) return null
      else return errors
    },
    inputTitle: 'Номер',
    inputPlaceholder: 'Введите номер...'
  }
};
