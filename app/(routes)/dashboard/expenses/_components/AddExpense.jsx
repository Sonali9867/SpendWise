


import React, { useState } from 'react';
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";

import { db } from '../../../../../utils/dbConfig';
import { Expenses } from '../../../../../utils/schema';
import { toast } from 'sonner';
import moment from 'moment';

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = async () => {
    if (!name.trim() || !amount || isNaN(parseFloat(amount))) {
      toast.error("Please enter a valid name and amount.");
      return;
    }

    try {
      const result = await db.insert(Expenses).values({
        name: name.trim(),
        amount: parseFloat(amount),
        budgetId: budgetId,
        createdAt: moment().format('DD/MM/YYYY')
      }).returning({ insertedId: Expenses.id });

      if (result) {
        refreshData();
        toast("New Expense Added!");
        setName("");
        setAmount("");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense.");
    }
  };

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg 'style={{ color: '#4845d2' }}>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black my-1 text-base'>Expense Name</h2>
        <Input
          type="text"
          placeholder="e.g. Bedroom Decor"
          className="focus-visible:border-black focus-visible:ring-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mt-2'>
        <h2 className='text-black my-1 text-base'>Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g. ₹1000"
          className="focus-visible:border-black focus-visible:ring-0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        disabled={!(name && amount)}
        onClick={addNewExpense}
        className="mt-3 w-full bg-blue-700 hover:bg-indigo-700"
        
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
