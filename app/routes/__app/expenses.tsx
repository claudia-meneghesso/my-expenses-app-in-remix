import { Link, Outlet } from "@remix-run/react";

import { FaPlus, FaDownload } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";

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
    <ExpensesHeader />
    <Outlet />
    <main>
      <section id="expenses-actions">
        <Link to="add">
          <FaPlus />
          <span>Add Expense</span>
        </Link>

        <a href="/expenses/raw">
          <FaDownload />
          <span>Load Raw Data</span>
        </a>
      </section>
      <ExpensesList expenses={data} />
    </main>
  </>
);

export default ExpensesLayout;
