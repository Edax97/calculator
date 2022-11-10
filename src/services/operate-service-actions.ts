import { ActionTypes } from "../types/services/operate-service-actions.types";

export const initValueAction = () => ({
  type: "INIT VALUE ACTION",
  payload: null,
});
export const digitAction = (digit: string) => ({
  type: ActionTypes.digitAction,
  payload: digit,
});
export const operatorAction = (operator: string) => ({
  type: ActionTypes.operatorAction,
  payload: operator,
});
export const clearAction = () => ({
  type: ActionTypes.clearAction,
  payload: null,
});
export const calculateAction = () => ({
  type: ActionTypes.calculateAction,
  payload: null,
});
