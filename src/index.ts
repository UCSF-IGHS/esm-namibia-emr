import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import patientDashboardsConfig from "./namibia-esm-and-dashboards-config.json";
import namibiaDashboardsConfig from "./namibia-config";

declare var __VERSION__: string;
const version = __VERSION__;

require("./root.scss");

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

const backendDependencies = {
  fhir2: "^1.2.0",
  "webservices.rest": "^2.2.0",
};

function setupOpenMRS() {
  const moduleName = "@ohri/esm-namibia-emr-app";

  const options = {
    featureName: "esm-namibia-emr-app",
    moduleName,
  };

  defineConfigSchema(moduleName, configSchema);

  provide(patientDashboardsConfig);
  // provide(namibiaDashboardsConfig);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./root"), options),
        route: /^home/,
      },
    ],
    extensions: [],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS, version };
