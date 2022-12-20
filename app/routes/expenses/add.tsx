import { FC } from "react";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export const ExpenseAddPage: FC = () => {
  const handleModalClose = () => {};

  return (
    <Modal onClose={handleModalClose}>
      <ExpenseForm />
    </Modal>
  );
};

export default ExpenseAddPage;
