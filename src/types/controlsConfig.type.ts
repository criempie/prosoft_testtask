import { ValidatorFn } from "@angular/forms";

export enum inputTypes {
  inputtext,
  select,
}

export interface controlsConfigInterface {
  [key: string]: {
    initValue: any,
    type: inputTypes,
    selectOptions?: selectOptionInterface[],
    validator?: ValidatorFn,
    inputTitle?: string,
    inputPlaceholder?: string,
  };
}

export interface selectOptionInterface {
  title: string;
  value: number;
}

export interface ConsumerWithoutIdInterface {
  name: string;
  type: 1 | 2;
  number: number;
}

export interface ConsumerInterface extends ConsumerWithoutIdInterface {
  id: number;
}
