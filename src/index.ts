import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import logoConfig from "./namibia-config";

require("./root.scss");

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);
const moduleName = "@ohri/esm-namibia-emr-app";

const options = {
  featureName: "esm-namibia-emr-app",
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
  provide(logoConfig);
}

export const mnchClinicalDashboard = getAsyncLifecycle(
  () => import("./root"),
  options
);
