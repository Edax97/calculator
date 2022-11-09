import React from "react";
import "./key-component.scss";

interface PropsType {
  keyLabel: string;
  id: string;
  onClick: (key: string) => any;
}

export default function KeyComponent(props: PropsType) {
  return (
    <div
      className="key"
      id={props.id}
      onClick={() => props.onClick(props.id)}
      role="button"
    >
      {props.keyLabel}
    </div>
  );
}
