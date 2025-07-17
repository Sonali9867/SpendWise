import React from 'react'
import Link from 'next/link'

// function BudgetItem({ budget }) {
//     const calculateProgressPer = () => {
//         //(spend/total)*100
//         const percent = (budget.totalSpend / budget.amount) * 100;
//         return percent>100?100: percent.toFixed(2);
//     }

function BudgetItem({ budget }) {
    const calculateProgressPer = () => {
        const percent = ((budget.totalSpend || 0) / budget.amount) * 100
        return percent > 100 ? 100 : percent.toFixed(2)
    }

    return (
        <Link href={'/dashboard/expenses/' + budget?.id}>
  <div className='p-4 border rounded-lg hover:shadow-md cursor-pointer'>
    <div className='flex gap-2 items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
        <div>
          <h2 className='font-bold'>{budget.name}</h2>
          <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
        </div>
      </div>
    </div>
    <div className='mt-4 space-y-2'>
      <h2 className='text-sm'>₹{budget.totalSpend ? budget.totalSpend : 0}</h2>
      <div className='w-full bg-slate-300 h-2 rounded-full'>
        <div
          className='h-2 rounded-full'
          style={{
            backgroundColor: '#4845d2',
            width: `${calculateProgressPer()}%`
          }}
        ></div>
      </div>
    </div>
  </div>
</Link>

    )
}

export default BudgetItem


