import { createContext, useEffect } from "react";
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  Observable,
  pairwise,
  scan,
  Subject,
  withLatestFrom,
} from "rxjs";
import {
  ActionCreatorType,
  ActionTypes,
} from "../types/services/operate-service-actions.types";
import { OperateServiceType } from "../types/services/operate-service.type";
import { isOperator } from "./is-operator";
import {
  calculateAction,
  clearAction,
  digitAction,
  operatorAction,
} from "./operate-service-actions";

const Action$ = new Subject<ActionCreatorType>();

const result$ = new BehaviorSubject<string>("0");

const lastValue$ = Action$.pipe(
  filter((action) => action.type !== ActionTypes.calculateAction),
  scan((lastValue, action) => {
    const { type, payload } = action;

    if (type === ActionTypes.digitAction) {
      //value was a operator
      if (isOperator(lastValue)) {
        return payload;
      }
      //decimal case
      if (payload === "." && lastValue.includes(".")) return lastValue;
      //Digit limit reached
      if (lastValue.length > 16) return lastValue;
      //value is 0
      if (lastValue === "0" && payload !== ".") return payload;
      if (lastValue === "") return payload;
      //Otherwise
      return lastValue + payload;
    }
    if (type === ActionTypes.operatorAction) {
      // inicializada, solo se admite -
      if (lastValue === "" && payload !== "-") return lastValue;
      // ultimo valor *+/ y tecla actual -
      if (isOperator(lastValue) && lastValue !== "-" && payload === "-")
        return lastValue + payload;
      return payload;
    }
    if (type === ActionTypes.clearAction) {
      return "";
    }

    return lastValue;
  }, "" as string)
);

const lastValueFormat$ = lastValue$.pipe(
  map((lastValue) => {
    if (lastValue === "X") return "*";
    if (lastValue === "X-") return "*-";
    return lastValue;
  })
);

const operation$ = Action$.pipe(
  withLatestFrom(lastValueFormat$.pipe(pairwise())),
  scan((operation, [action, [previousValue, value]]) => {
    const { type } = action;
    if (type === ActionTypes.digitAction) {
      result$.next("");
      if (isOperator(previousValue)) return [...operation, previousValue];
    }
    if (type === ActionTypes.operatorAction) {
      //despues de un calculo
      if (result$.value.length > 0) return [result$.value];
      //despues de un numero
      if (!isOperator(previousValue) && previousValue !== "")
        return [...operation, previousValue];
    }
    if (type === ActionTypes.clearAction) {
      result$.next("");
      return [] as string[];
    }
    if (type === ActionTypes.calculateAction) {
      const result: number = isOperator(value)
        ? window.eval(operation.join(""))
        : window.eval(operation.join("") + value);
      result$.next(result.toString());
    }
    return [...operation];
  }, [] as string[])
);

const displayValue$ = merge(lastValue$, result$) as Observable<string>;

const operationConcat$ = lastValueFormat$.pipe(
  withLatestFrom(operation$),
  map(([lastValue, operation]) => [...operation, lastValue])
);

const enterDigit = (digit: string) => {
  Action$.next(digitAction(digit));
};

const addOperator = (operator: string) => {
  Action$.next(operatorAction(operator));
};

const equals = () => {
  Action$.next(calculateAction());
};

const clear = () => {
  Action$.next(clearAction());
};

const operateServiceValue = {
  displayValue$,
  operation$: operationConcat$,
  enterDigit,
  addOperator,
  equals,
  clear,
};

export const OperateServiceContext =
  createContext<OperateServiceType>(operateServiceValue);

export function OperateServiceProvider(props: any) {
  useEffect(() => {
    clear();
  }, []);

  return (
    <OperateServiceContext.Provider value={operateServiceValue}>
      {props.children}
    </OperateServiceContext.Provider>
  );
}
