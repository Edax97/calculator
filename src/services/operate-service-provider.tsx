import { createContext } from "react";
import { BehaviorSubject, scan } from "rxjs";
import { OperateServiceType } from "../types/services/operate-service.type";
import * as Calculator from "@mroutput/jscalc";

const calculator = new Calculator();

const lastValue$ = new BehaviorSubject<string>("0");
const addLastValue$ = new BehaviorSubject<string>("0");
const operation$ = addLastValue$.pipe(
  scan((acc, value) => [...acc, value], [] as string[])
);

const enterDigit = (digit: string) => {
  //decimal case
  if (digit === "." && lastValue$.value.includes(".")) return;

  //value is empty
  if (lastValue$.value === "0" && digit !== ".") return lastValue$.next(digit);

  //value was a operator
  if (/\+|-|X|\//.test(lastValue$.value)) {
    //Add operator to operation
    addLastValue$.next(lastValue$.value);
    return lastValue$.next(digit);
  }

  //Digit limit reached
  if (lastValue$.value.length > 16) return;

  //Otherwise Add digit to number
  lastValue$.next(lastValue$.value + digit);
};

const addOperator = (operator: string) => {
  //Value is empty
  if (lastValue$.value === "0" && operator !== "-") return;

  //Value was operator and current operator is -
  if (/\+|X|\//.test(lastValue$.value) && operator === "-") {
    addLastValue$.next(lastValue$.value);
    return lastValue$.next(operator);
  }

  //Value was a operator. Replace it
  if (/\+|-|X|\//.test(lastValue$.value)) return lastValue$.next(operator);

  //Otherwise add number to operation
  addLastValue$.next(lastValue$.value);
  lastValue$.next(operator);
};

const equals = () => {
  console.log(calculator.exec("0.46+0.23"));
};

const clear = () => {
  lastValue$.next("reset");
  lastValue$.next("0");
};

const operateServiceValue = {
  lastValue$,
  operation$,
  enterDigit,
  addOperator,
  equals,
  clear,
};

export const OperateServiceContext =
  createContext<OperateServiceType>(operateServiceValue);

export function OperateServiceProvider(props: any) {
  return (
    <OperateServiceContext.Provider value={operateServiceValue}>
      {props.children}
    </OperateServiceContext.Provider>
  );
}
