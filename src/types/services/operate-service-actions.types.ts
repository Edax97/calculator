export interface ActionCreatorType {
  type: string;
  payload?: any;
}
export enum ActionTypes {
  digitAction = "DIGIT ACTION",
  operatorAction = "OPERATOR ACTION",
  clearAction = "CLEAR ACTION",
  calculateAction = "CALCULATE ACTION",
}
