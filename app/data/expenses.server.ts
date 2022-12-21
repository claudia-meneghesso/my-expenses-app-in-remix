import { prisma } from "./database.server";

import { Expense } from "~/types/expense";

export const getExpenses = async () => {
  try {
    return await prisma.expense.findMany({ orderBy: { date: "desc" } });
  } catch (error) {
    throw new Error("Failed to get all expenses");
  }
};

export const getExpense = async (id: string) => {
  try {
    return prisma.expense.findUnique({ where: { id } });
  } catch (error) {
    throw new Error("Failed to get expense");
  }
};

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
    throw new Error("Failed to add expense");
  }
};

export const editExpense = async (id, expenseData) => {
  try {
    return await prisma.expense.update({ select: id, data: expenseData });
  } catch (error) {
    throw new Error("Failed to edit expense");
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error("Failed to update expense");
  }
};

export const deleteExpense = async (id) => {
  try {
    return await prisma.expense.delete({ where: { id: "abc" } });
  } catch (error) {
    throw new Error("Failed to delete expense");
  }
};
