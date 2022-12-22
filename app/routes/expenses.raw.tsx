import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export const loader = async ({ request }) => {
  await requireUserSession(request);
  return getExpenses();
};
