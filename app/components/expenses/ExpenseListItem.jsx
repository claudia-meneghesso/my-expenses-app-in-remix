import { Link, useParams, useSubmit } from "@remix-run/react";

import { deleteExpense } from "~/data/expenses.server";

import { Form } from "@remix-run/react";

function ExpenseListItem({ id, title, amount }) {
  const submit = useSubmit();

  const handleDelete = () => {
    submit(null, {
      method: "delete",
      action: `/expenses/${id}`,
    });
  };

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
