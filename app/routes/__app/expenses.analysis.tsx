import { FC } from "react";

import ExpensesStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";

import { getExpenses } from "~/data/expenses.server";
import { useLoaderData } from "@remix-run/react";

export const ExpenseAnalysisPage: FC = () => {
  const data = useLoaderData();

  return (
    <>
      <ExpensesHeader />
      <main>
        <Chart expenses={data} />
        <ExpensesStatistics expenses={data} />
      </main>
    </>
  );
};

export default ExpenseAnalysisPage;

export const loader = async () => {
  return getExpenses();
};
