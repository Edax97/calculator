import { Observable } from "rxjs";

export interface OperateServiceType {
  lastValue$: Observable<string>;
  operation$: Observable<string[]>;
  enterDigit: (digit: string) => any;
  addOperator: (operator: string) => any;
  equals: () => any;
  clear: () => any;
}
