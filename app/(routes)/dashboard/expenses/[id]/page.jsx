



"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getTableColumns, eq, and, sql, desc } from "drizzle-orm";

import { Budgets, Expenses } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";

import BudgetItem from "../../budgets/_components/BudgetItem";
import EditBudget from "../_components/EditBudget";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "../../../../../components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";

function ExpensesScreen({params}) {
  const unwrappedParams = React.use(params);
  const { user } = useUser();
  // const budgetId = Number(params.id);
   const budgetId = Number(unwrappedParams.id);
  
  const router = useRouter();

  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getBudgetInfo();
    }
  }, [user]);

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`COALESCE(sum(${Expenses.amount}), 0)`.mapWith(Number),
          totalItem: sql`COALESCE(count(${Expenses.id}), 0)`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(
          and(
            eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress),
            eq(Budgets.id, budgetId)
          )
        )
        .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
      await getExpensesList();
    } catch (error) {
      console.error("Error fetching budget info:", error);
      toast.error("Failed to load budget info.");
    }
  };

  const getExpensesList = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, budgetId))
        .orderBy(desc(Expenses.id));
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses list:", error);
      toast.error("Failed to load expenses.");
    }
  };

  const deleteBudget = async () => {
    try {
      await db.delete(Expenses).where(eq(Expenses.budgetId, budgetId));
      await db.delete(Budgets).where(eq(Budgets.id, budgetId));
      toast("Budget Deleted!");
      router.replace("/dashboard/budgets");
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete budget.");
    }
  };

  return (
    <div className="p-7">
      <h2 className="text-3xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
          {budgetInfo && (
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={getBudgetInfo}
            />
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your current budget and its expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBudget}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={budgetId}
          user={user}
          refreshData={getBudgetInfo}
        />
      </div>

      <div className="mt-4">
       
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={getBudgetInfo}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;

