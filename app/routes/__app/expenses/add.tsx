import { useNavigate } from "@remix-run/react";
import { FC } from "react";
import { redirect } from "@remix-run/node";

import { addExpense } from "~/data/expenses.server";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

import { Expense } from "~/types/expense";
import { validateExpenseInput } from "~/data/validation.server";

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

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  const expenseData = Object.fromEntries(formData) as Expense;

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData);

  return redirect("/expenses");
};
