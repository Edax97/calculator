import { useObservableState } from "observable-hooks";
import { useOperateService } from "../../../services/use-operate-service";
import { DisplayComponent } from "../display-component/DisplayComponent";

export const DisplayContainer = () => {
  const { operation$, displayValue$ } = useOperateService();
  const operation = useObservableState(operation$, []);
  const displayValue = useObservableState(displayValue$, "0");
  return (
    <DisplayComponent
      operation={operation?.join("")}
      displayValue={displayValue}
    />
  );
};
