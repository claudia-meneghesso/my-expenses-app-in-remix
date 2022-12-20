import { useNavigate } from "@remix-run/react";
import { FC } from "react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

import { getExpense } from "~/data/expenses.server";

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

export const loader = async ({ params }) => {
  const expenseId = params.id;

  const expense = await getExpense(expenseId);

  return expense;
};
