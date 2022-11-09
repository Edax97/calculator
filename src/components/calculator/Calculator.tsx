import { DisplayContainer } from "../display/display-container/DisplayContainer";
import { KeyPadContainer } from "../key-pad/key-pad-container/KeyPadContainer";
import "./calculator.scss";

export const Calculator = () => {
  return (
    <div id="calculator" className="p-2 bg-black text-light">
      <DisplayContainer />
      <KeyPadContainer />
    </div>
  );
};
