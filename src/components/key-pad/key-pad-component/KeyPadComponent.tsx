import { keysData } from "../../../services/keys-data";
import KeyComponent from "../key-component/KeyComponent";
import "./key-pad-components.scss";

interface PropsType {
  onKeyPressed: (id: string) => any;
}

export const KeyPadComponent = (props: PropsType) => {
  return (
    <div className="key-pad mt-2">
      {keysData.map(({ id, label }) => {
        return (
          <KeyComponent
            key={id}
            id={id}
            keyLabel={label}
            onClick={props.onKeyPressed}
          />
        );
      })}
    </div>
  );
};
