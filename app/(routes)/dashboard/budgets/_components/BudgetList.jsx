// // "use client"

// // import React, { useEffect, useState } from 'react'
// // import CreateBudget from './CreateBudget'
// // import { getTableColumns, eq, sql, desc } from 'drizzle-orm'
// // import { Budgets, Expenses } from '../../../../../utils/schema' // ✅ Corrected path
// // import { db } from '../../../../../lib/utils'; // adjust path if different

// // import { userAgent, useUser } from '@clerk/nextjs' 


// // function BudgetList() {
// //   const [budgetList, setBudgetList] = useState([]);
// //   const{user} =useUser();

// //   useEffect(()=>{
// //     getBudgetList();
// //   },[])

// //   const getBudgetList = async()=>{
// //     const result = await db.select({
// //         ...getTableColumns(Budgets),
// //         totalSpend:sql `sum (${Expenses.amount})`.mapWith(Number),
// //         totalItem:sql `count(${Expenses.id})`.mapWith(Number)
// //     }).from (Budgets)
// //     .leftJoin(Expenses,eq (Budgets.id,Expenses.budgetId))
// //     .where(eq(Budgets.createdBy,userAgent.primaryEmailAddress?.emailAddress))
// //     .groupBy(Budgets.id)
// //     .orderBy(desc(Budgets.id))
// //     setBudgetList(result);
// //   }

// //   return (
// //     <div className='mt-7'>
// //       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
// //       <CreateBudget
// //       refreshData={()=>getBudgetList()}/>
// //       {budgetList?.length>0 ? budgetList.map((budget,index)=>(
// //         <BudgetItem budget={budget}/>
// //       ))
// //       :[1,2,3,4,5,6].map((item,index)=>(
// //         <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

// //         </div>
// //       ))
// //       }
// //       </div>
// //     </div>
// //   )
// // }

// // export default BudgetList


// "use client"

// import React, { useEffect, useState } from 'react'
// import CreateBudget from './CreateBudget'
// import BudgetItem from './BudgetItem' // ✅ Ensure this file exists

// import { eq, sql, desc } from 'drizzle-orm'

// import { Budgets, Expenses } from '../../../../../utils/schema';
// import { db } from '../../../../../utils/dbConfig';

// import { useUser } from '@clerk/nextjs'

// function BudgetList() {
//   const [budgetList, setBudgetList] = useState([])
//   const { user } = useUser()

//   useEffect(() => {
//     if (user?.primaryEmailAddress?.emailAddress) {
//       getBudgetList()
//     }
//   }, [user])

//   const getBudgetList = async () => {
//     try {
//       const result = await db
//         .select({
//           id: Budgets.id,
//           name: Budgets.name,
//           amount: Budgets.amount,
//           icon: Budgets.icon,
//           createdBy: Budgets.createdBy,
//           createdAt: Budgets.createdAt,
//           totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
//           totalItem: sql`count(${Expenses.id})`.mapWith(Number)
//         })
//         .from(Budgets)
//         .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//         .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
//         .groupBy(Budgets.id)
//         .orderBy(desc(Budgets.id))

//       setBudgetList(result)
//     } catch (error) {
//       console.error("Error fetching budget list:", error)
//     }
//   }

//   return (
//     <div className='mt-7'>
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//         <CreateBudget refreshData={getBudgetList} />

//         {budgetList.length > 0 ? (
//           budgetList.map((budget, index) => (
//             <BudgetItem key={index} budget={budget} />
//           ))
//         ) : (
//           [1, 2, 3, 4, 5, 6].map((item, index) => (
//             <div
//               key={index}
//               className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'
//             />
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

// export default BudgetList


"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'
import { eq, sql, desc } from 'drizzle-orm'

import { Budgets, Expenses } from '../../../../../utils/schema'
import { db } from '../../../../../utils/dbConfig'
import { useUser } from '@clerk/nextjs'

function BudgetList() {
  const [budgetList, setBudgetList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getBudgetList()
    }
  }, [user])

  const getBudgetList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("No user email found")
      return
    }

    try {
      setIsLoading(true)
      const result = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          amount: Budgets.amount,
          icon: Budgets.icon,
          createdBy: Budgets.createdBy,
          totalSpend: sql`COALESCE(sum(${Expenses.amount}), 0)`.mapWith(Number),
          totalItem: sql`COALESCE(count(${Expenses.id}), 0)`.mapWith(Number)
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id))

      setBudgetList(result || [])
    } catch (error) {
      console.error("Error fetching budget list:", error)
      setBudgetList([])
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={getBudgetList} />

        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'
            />
          ))
        ) : budgetList.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'
            />
          ))
        )}
      </div>
    </div>
  )
}

export default BudgetList

