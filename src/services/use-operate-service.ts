import { useContext } from "react";
import { OperateServiceContext } from "./operate-service-provider";

export const useOperateService = () => useContext(OperateServiceContext);
