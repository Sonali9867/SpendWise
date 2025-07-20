

"use client";
import React from "react";
import { Trash } from "lucide-react";
import { db } from "../../../../../utils/dbConfig";
import { Expenses } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result?.length > 0) {
        toast("Expense Deleted!");
        refreshData(); // Refresh the table after deletion
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-2xl">Latest Expenses</h2>

      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
        <h2 className="font-semibold">Name</h2>
        <h2 className="font-semibold">Amount</h2>
        <h2 className="font-semibold">Date</h2>
        <h2 className="font-semibold">Action</h2>
      </div>

      {expensesList.map((expense, index) => (
        <div
          key={expense.id}
          className="grid grid-cols-4 bg-slate-50 p-2 items-center"
        >
          <h2>{expense.name}</h2>
          <h2>₹{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(expense)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
