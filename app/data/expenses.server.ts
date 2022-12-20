import { prisma } from "./database.server";

import { Expense } from "~/types/expense";

export const addExpense = async (expenseData: Expense) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
