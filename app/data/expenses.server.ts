import { prisma } from "./database.server";

import { Expense } from "~/types/expense";

export const getExpenses = async () => {
  try {
    return await prisma.expense.findMany({ orderBy: { date: "desc" } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExpense = async (id: string) => {
  try {
    return prisma.expense.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
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
    console.log(error);
    throw error;
  }
};

export const editExpense = async (id, expenseData) => {
  return await prisma.expense.update({ select: id, data: expenseData });
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
    console.log(error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    return await prisma.expense.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
