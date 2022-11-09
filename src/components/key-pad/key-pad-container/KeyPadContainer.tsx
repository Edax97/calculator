import { keysData } from "../../../services/keys-data";
import { useOperateService } from "../../../services/use-operate-service";
import { KeyPadComponent } from "../key-pad-component/KeyPadComponent";

export const KeyPadContainer = () => {
  const { clear, equals, addOperator, enterDigit } = useOperateService();

  const onKeyPressed = (id: string) => {
    const keyFound = keysData.find((key) => key.id === id);
    const { label, role } = keyFound as any;

    switch (role) {
      case "clear":
        clear();
        break;
      case "equals":
        equals();
        break;
      case "operator":
        addOperator(label);
        break;
      case "digit":
        enterDigit(label);
        break;
      default:
        break;
    }
  };

  return <KeyPadComponent onKeyPressed={onKeyPressed} />;
};
