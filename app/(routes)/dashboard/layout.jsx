"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '../../../utils/dbConfig'
import { Budgets } from '../../../utils/schema'

import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

function DashboardLayout({ children }) {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    const checkUserBudgets = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.log('No user email found')
        return
      }

      try {
        const result = await db
          .select()
          .from(Budgets)
          .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))

        if (!result || result.length === 0) {
          router.replace('/dashboard/budgets')
        }
      } catch (error) {
        console.error('Error checking user budgets:', error)
      }
    }

    if (user) {
      checkUserBudgets()
    }
  }, [user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='fixed md:w-64 hidden md:block'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
