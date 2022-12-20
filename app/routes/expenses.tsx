import { Outlet } from "@remix-run/react";

import styles from "~/styles/expenses.css";

const ExpensesLayout = () => (
  <main>
    <p>Shared layout!</p>
    <Outlet />
  </main>
);

export default ExpensesLayout;

export const links = () => [{ rel: "stylesheet", href: styles }];
