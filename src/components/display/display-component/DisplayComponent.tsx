import "./display-component.scss";

interface PropsType {
  operation: string | undefined;
  lastValue: string | undefined;
}
export const DisplayComponent = (props: PropsType) => {
  return (
    <div className="text-end" id="display">
      <div className="fs-5 text-info lh-1 mb-2">{props.operation}</div>
      <div className="fs-3 text-light lh-1">{props.lastValue}</div>
    </div>
  );
};
