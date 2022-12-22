import { Outlet } from "@remix-run/react";

import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { getUserFromSession } from "~/data/auth.server";

import styles from "~/styles/expenses.css";

const ExpensesAppLayout = () => (
  <>
    <ExpensesHeader />
    <main>
      <Outlet />
    </main>
  </>
);

export default ExpensesAppLayout;

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }) => {
  const userId = getUserFromSession(request);

  return userId;
};
