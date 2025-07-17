'use client';

import React, { useEffect, useState } from 'react';
import { eq, sql, desc } from 'drizzle-orm';
import { Budgets, Expenses } from '../../../utils/schema.jsx';
import { db } from '../../../utils/dbConfig';
import { useUser } from '@clerk/nextjs';
import CardsInfo from './_components/CardsInfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("No user email found");
      return;
    }

    try {
      setIsLoading(true);
      const result = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          amount: Budgets.amount,
          icon: Budgets.icon,
          createdBy: Budgets.createdBy,
          totalSpend: sql`COALESCE(sum(${Expenses.amount}), 0)`.mapWith(Number),
          totalItem: sql`COALESCE(count(${Expenses.id}), 0)`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result || []);
      await getAllExpenses();
    } catch (error) {
      console.error("Error fetching budget list:", error);
      setBudgetList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllExpenses = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("No user email found");
      return;
    }

    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpensesList(result || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpensesList([]);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-8'>
      <h2 className='font-semibold text-3xl'>Hi, {user?.fullName}✌️</h2>
      <p className='text-gray-600 mt-1'>Where every rupee counts — let's budget better!</p>
      
      {isLoading ? (
        <div className='animate-pulse'>
          <div className='h-32 bg-slate-200 rounded-lg mt-4'></div>
          <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
            <div className='md:col-span-2 h-64 bg-slate-200 rounded-lg'></div>
            <div className='h-64 bg-slate-200 rounded-lg'></div>
          </div>
        </div>
      ) : (
        <>
          <CardsInfo budgetList={budgetList} />
          <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
            <div className='md:col-span-2'>
              <BarChartDashboard budgetList={budgetList} />
              <ExpenseListTable
                expensesList={expensesList}
                refreshData={() => getBudgetList()}
              />
            </div>
            <div className='flex flex-col space-y-5'>

              <h2 className='font-bold text-2xl'>Latest Budgets</h2>
              {budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={budget.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
