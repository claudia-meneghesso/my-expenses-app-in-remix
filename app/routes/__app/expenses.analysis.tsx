import { FC } from "react";

import Error from "~/components/util/Error";
import ExpensesStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";

import { getExpenses } from "~/data/expenses.server";
import { useCatch, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

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

export const loader = async () => {
  const expenses = await getExpenses();

  if (!expenses || expenses.length === 0) {
    throw json({
      message: "No expenses found",
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
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            "Something went wrong! Could not load expenses."}
        </p>
      </Error>
    </main>
  );
};
