import { Outlet } from "@remix-run/react";

import ExpensesHeader from "~/components/navigation/ExpensesHeader";

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
