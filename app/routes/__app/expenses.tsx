import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";

import { getExpenses } from "~/data/expenses.server";

const ExpensesLayout = () => {
  const data = useLoaderData();

  return (
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
};

export default ExpensesLayout;

export const loader = () => {
  return getExpenses();
};
