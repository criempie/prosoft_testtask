export enum inputTypes {
  inputtext,
  select,
}

export interface controlsConfig {
  [key: string]: {
    initValue: any,
    type: inputTypes,
    selectOptions?: selectOption[],
    validator?: (value: any) => boolean,
    inputTitle?: string,
    inputPlaceholder?: string,
  }
}

export interface selectOption {
  title: string,
  value: number
}
