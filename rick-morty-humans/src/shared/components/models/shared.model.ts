export interface IMessageModal {
  title: string;
  message: string;
  show: boolean;
  buttonActionAccept: () => void;
  buttonActionClose: () => void;
  closeSharedMessageSucces?: () => void;
  typeMessage: ITypeMessageModal;
}

export enum ITypeMessageModal {
  success = 1,
  fail = 2,
  warning = 3,
  informative = 4,
}
