import { Outlet } from "@remix-run/react";

import ExpensesList from "~/components/expenses/ExpensesList";

import styles from "~/styles/expenses.css";

const data = [
  {
    id: "e1",
    title: "First expense",
    amount: 16.22,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second expense",
    amount: 45.0,
    date: new Date().toISOString(),
  },
  {
    id: "e3",
    title: "Third expense",
    amount: 84.34,
    date: new Date().toISOString(),
  },
];

const ExpensesLayout = () => (
  <>
    <Outlet />
    <main>
      <ExpensesList expenses={data} />
    </main>
  </>
);

export default ExpensesLayout;

export const links = () => [{ rel: "stylesheet", href: styles }];
