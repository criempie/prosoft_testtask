import { ValidatorFn } from "@angular/forms";

export enum inputTypes {
  inputtext,
  select,
  id
}

export interface controlConfigInterface {
  initValue: any,
  type: inputTypes,
  hidden?: boolean,
  selectOptions?: selectOptionInterface[],
  validator?: ValidatorFn,
  inputTitle?: string,
  inputPlaceholder?: string,
}

export interface controlsConfigInterface {
  [key: string]: controlConfigInterface;
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
