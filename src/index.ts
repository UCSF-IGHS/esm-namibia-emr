import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { registerExpressionHelper } from "@openmrs/openmrs-form-engine-lib"
import { generateInfantPTrackerId } from "./helpers/ptracker-form-helpers";

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
  registerExpressionHelper("customGenerateInfantPTrackerId", generateInfantPTrackerId)
}

export const mnchClinicalDashboard = getAsyncLifecycle(
  () => import("./root"),
  options
);
