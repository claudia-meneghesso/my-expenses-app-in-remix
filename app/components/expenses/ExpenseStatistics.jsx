import { useMemo } from "react";

function calculateSummaryStatistics(expenses) {
  const amounts = expenses.map((expense) => +expense.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const sum = expenses.reduce((prevVal, curVal) => curVal.amount + prevVal, 0);
  const mean = sum / expenses.length;

  return { minAmount, maxAmount, sum, mean };
}

function ExpenseStatistics({ expenses }) {
  const { minAmount, maxAmount, sum, mean } = useMemo(
    () => calculateSummaryStatistics(expenses),
    [expenses]
  );

  return (
    <section>
      <h2>Summary Statistics</h2>

      <dl id="expense-statistics">
        <div>
          <dt>Total</dt>
          <dd>${sum ? sum.toFixed(2) : 0}</dd>
        </div>
        <div>
          <dt>Average</dt>
          <dd>${mean ? mean.toFixed(2) : 0}</dd>
        </div>
        <div>
          <dt> Min. Amount</dt>
          <dd>${minAmount !== Infinity ? minAmount.toFixed(2) : 0}</dd>
        </div>
        <div>
          <dt>Max. Amount</dt>
          <dd>${maxAmount !== -Infinity ? maxAmount.toFixed(2) : 0}</dd>
        </div>
      </dl>
    </section>
  );
}

export default ExpenseStatistics;
