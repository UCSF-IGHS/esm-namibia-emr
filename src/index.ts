import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import patientDashboardsConfig from "./namibia-esm-and-dashboards-config.json";

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
}

export const mnchClinicalDashboard = getAsyncLifecycle(
  () => import("./root"),
  options
);
