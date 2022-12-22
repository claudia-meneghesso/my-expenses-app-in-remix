import { FC } from "react";

import Error from "~/components/util/Error";
import ExpensesStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";

import { getExpenses } from "~/data/expenses.server";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export const ExpenseAnalysisPage: FC = () => {
  const data = useLoaderData();

  return (
    <main>
      <Chart expenses={data} />
      <ExpensesStatistics expenses={data ?? []} />
    </main>
  );
};

export default ExpenseAnalysisPage;

export const loader = async ({ request }) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json({
      message: "Could not load expenses analysis. Yet to add some?",
      status: 404,
      statusText: "No expenses found.",
    });
  }

  return expenses;
};

export const CatchBoundary = () => {
  const caughtResponse = useCatch();

  return (
    <main>
      <Error title={caughtResponse.data.statusText}>
        <p>
          {caughtResponse.data?.message ||
            "Something went wrong! Could not load expenses."}
        </p>
        <p>
          Add some <Link to="../expenses/add">here!</Link>
        </p>
      </Error>
    </main>
  );
};
