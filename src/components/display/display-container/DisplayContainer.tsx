import { useObservableState } from "observable-hooks";
import { useOperateService } from "../../../services/use-operate-service";
import { DisplayComponent } from "../display-component/DisplayComponent";

export const DisplayContainer = () => {
  const { operation$, lastValue$ } = useOperateService();
  const operation = useObservableState(operation$);
  const lastValue = useObservableState(lastValue$);
  return (
    <DisplayComponent operation={operation?.join("")} lastValue={lastValue} />
  );
};
