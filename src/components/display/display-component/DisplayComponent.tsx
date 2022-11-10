import "./display-component.scss";

interface PropsType {
  operation: string | undefined;
  displayValue: string | undefined;
}
export const DisplayComponent = (props: PropsType) => {
  const operation = props.operation || "empty";
  const classVisible = operation === "empty" ? "invisible" : "visible";

  const displayValue = props.displayValue || "0";

  return (
    <div className="display-component text-end">
      <div className="fs-5 text-info lh-1 mb-2">
        <span className={classVisible}>{operation}</span>
      </div>
      <div className="fs-3 text-light lh-1" id="display">
        {displayValue}
      </div>
    </div>
  );
};
