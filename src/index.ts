import { getAsyncLifecycle, getSyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createDashboardLink } from "./create-dashboard-link.component";

const moduleName = "@ugandaemr/esm-ugandaemr-exchange-app";

const options = {
  featureName: "health-exchange",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export const healthExchangeLink = getSyncLifecycle(
  createDashboardLink({
    name: "health-exchange",
    slot: "health-exchange-dashboard-slot",
    title: "Health Exchange",
  }),
  options
);
export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options
);
