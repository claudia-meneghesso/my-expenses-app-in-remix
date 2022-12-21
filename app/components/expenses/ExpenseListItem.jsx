import { Link, useFetcher } from "@remix-run/react";

import { deleteExpense } from "~/data/expenses.server";

function ExpenseListItem({ id, title, amount }) {
  const fetcher = useFetcher();

  const handleDelete = () => {
    fetcher.submit(null, {
      method: "delete",
      action: `/expenses/${id}`,
    });
  };

  if (fetcher.state !== "idle") {
    const proceed = confirm("Are you sure you want to delete this expense?");

    if (!proceed) {
      return;
    }

    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={handleDelete}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
