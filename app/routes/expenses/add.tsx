import { useNavigate } from "@remix-run/react";
import { FC } from "react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

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
