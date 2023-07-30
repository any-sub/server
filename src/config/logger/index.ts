import { $log, PlatformLoggerSettings } from "@tsed/common";
import { isProduction } from "../envs";

const layout = isProduction
  ? {
      type: "json"
    }
  : undefined;

$log.appenders.set("stdout", {
  type: "stdout",
  levels: ["info", "debug"],
  layout
});

$log.appenders.set("stderr", {
  type: "stderr",
  levels: ["trace", "fatal", "error", "warn"],
  layout
});

export default <PlatformLoggerSettings>{
  disableRoutesSummary: isProduction
};
