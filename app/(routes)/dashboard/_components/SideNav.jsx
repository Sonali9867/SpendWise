'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard',
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets',
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses/1',
        },
        {
            id: 4,
            name: 'Upgrades',
            icon: ShieldCheck,
            path: '/dashboard/upgrade',
        },
    ]

    const path = usePathname()

    useEffect(() => {
        
    }, [path])

    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image
                src={'/logo.svg'}
                alt='logo'
                width={160}
                height={100}
            />
            <div className='mt-5'>
                {menuList.map((menu) => (
                    <Link key={menu.id} href={menu.path}>
                        <h2
                            className={`flex gap-2 items-center text-gray-600 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100
                            ${path === menu.path && 'text-primary bg-blue-200'}`}
                        >
                            <menu.icon /> {/* Rendering the icon as a component */}
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav
