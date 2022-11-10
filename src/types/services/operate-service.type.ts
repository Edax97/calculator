import { Observable } from "rxjs";

export interface OperateServiceType {
  displayValue$: Observable<string>;
  operation$: Observable<string[]>;
  enterDigit: (digit: string) => any;
  addOperator: (operator: string) => any;
  equals: () => any;
  clear: () => any;
}
