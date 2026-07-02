import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { buildDashboardOverview } from "./generators";
import { validateDashboardConsistency } from "./validator";

// Fail fast during dev startup if the mock generator ever produces
// inconsistent totals (BA rule 4.2).
validateDashboardConsistency(
  buildDashboardOverview(
    new Date(Date.now() - 7 * 86400000).toISOString(),
    new Date().toISOString(),
  ),
);

export const worker = setupWorker(...handlers);
