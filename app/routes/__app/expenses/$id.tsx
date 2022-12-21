import { useNavigate } from "@remix-run/react";
import { FC } from "react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

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
