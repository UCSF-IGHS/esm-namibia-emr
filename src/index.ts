import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import patientDashboardsConfig from "./namibia-esm-and-dashboards-config.json";
import logoConfig from "./namibia-config";
import { ConfigInitializer } from "./root";

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
  provide(patientDashboardsConfig);
  provide(logoConfig);
}

export const mnchClinicalDashboard = getAsyncLifecycle(
  () => import("./root"),
  options
);

// There is a regression with how configs are being loaded by framework driven by supported routes.
// This hack forces the framework to run this module's starter func on initial load
export const configInitializer = getSyncLifecycle(ConfigInitializer, options);
