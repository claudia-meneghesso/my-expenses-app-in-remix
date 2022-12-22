import { useNavigate } from "@remix-run/react";
import { FC } from "react";
import { redirect } from "@remix-run/node";

import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import { requireUserSession } from "~/data/auth.server";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

import { Expense } from "~/types/expense";

export const ExpenseAddPage: FC = () => {
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

export default ExpenseAddPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const expenseData = Object.fromEntries(formData) as Expense;

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  const userId = await requireUserSession(request);

  await addExpense(expenseData, userId);

  return redirect("/expenses");
};
