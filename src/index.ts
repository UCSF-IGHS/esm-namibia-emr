import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

declare var __VERSION__: string;
const version = __VERSION__;

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
  const moduleName = "@ohri/esm-namibia-emr";

  const options = {
    featureName: "esm-namibia-emr",
    moduleName,
  };

  defineConfigSchema(moduleName, configSchema);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./hello"), options),
        route: "hello",
      },
    ],
    extensions: [
      {
        name: "Red box",
        load: getAsyncLifecycle(
          () => import("./boxes/extensions/red-box"),
          options
        ),
        slot: "Boxes",
      },
      {
        name: "Blue box",
        load: getAsyncLifecycle(
          () => import("./boxes/extensions/blue-box"),
          options
        ),
        slot: "Boxes",
        // same as `slots: ["Boxes"],`
      },
      {
        name: "Brand box",
        load: getAsyncLifecycle(
          () => import("./boxes/extensions/brand-box"),
          options
        ),
        slot: "Boxes",
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS, version };
