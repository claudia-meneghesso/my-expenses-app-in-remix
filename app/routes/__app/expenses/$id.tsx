import { useNavigate } from "@remix-run/react";
import { FC } from "react";

import { deleteExpense, updateExpense } from "~/data/expenses.server";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "~/data/validation.server";
import { Expense } from "~/types/expense";

export const meta = ({ params, location, parentsData }) => {
  const expense = parentsData["routes/__app/expenses"].find(
    (exp) => exp.id === params.id
  );
  return {
    title: expense.title,
    description: "Update expense",
  };
};

export const ExpenseDetailPage: FC = () => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate("/expenses");
  };

  return (
    <Modal onClose={handleCloseModal}>
      <ExpenseForm />
    </Modal>
  );
};

export default ExpenseDetailPage;

export const action = async ({ params, request }) => {
  const expenseId = params.id;

  if (request.method === "PATCH") {
    const formData = await request.formData();

    const expenseData = Object.fromEntries(formData) as Expense;

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);

    return redirect("/expenses");
  }

  if (request.method === "DELETE") {
    await deleteExpense(expenseId);

    return null;
  }
};
