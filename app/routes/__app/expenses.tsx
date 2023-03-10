import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { FaPlus, FaDownload } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";

import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

const ExpensesLayout = () => {
  const data = useLoaderData();

  const hasExpenses = !data || data.length !== 0;

  return (
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
      {hasExpenses ? (
        <ExpensesList expenses={data} />
      ) : (
        <section id="no-expenses">
          <h1>No expenses found</h1>
          <p>
            Start <Link to="add">adding some </Link>today.
          </p>
        </section>
      )}
      <Outlet />
    </main>
  );
};

export default ExpensesLayout;

export const loader = async ({ request }) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  return expenses;
};
