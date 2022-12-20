import { FC } from "react";

import ExpensesStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";

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

export const ExpenseAnalysisPage: FC = () => (
  <main>
    <Chart expenses={data} />
    <ExpensesStatistics expenses={data} />
  </main>
);

export default ExpenseAnalysisPage;
