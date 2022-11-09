import React from "react";
import "./App.scss";
import { Calculator } from "./components/calculator/Calculator";
import { OperateServiceProvider } from "./services/operate-service-provider";

function App() {
  return (
    <OperateServiceProvider>
      <div className="App">
        <Calculator />
      </div>
    </OperateServiceProvider>
  );
}

export default App;
