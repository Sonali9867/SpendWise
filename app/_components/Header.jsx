// "use client"
// import React from 'react'
// import Image from 'next/image'
// import { useUser, UserButton } from '@clerk/nextjs'
// import Link from 'next/link';
// // import { Button } from "components/ui/button.jsx"

// function Header() {

//   const{user,isSignedIn}=useUser();

//   return (
//     <div className='p-5 flex justify-between items-center border shadow-sm'>
//      <Image
//       src="/logo.svg"
//       alt="Logo"
//       width={200}
//       height={100}
//     />

//     {isSignedIn?
//     <UserButton/>: <Link href={'/auth/sign-in'}>
//       <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded">
//         Get Started
//       </button>
//     </Link>
//     }

//     </div>
//   )
// }

// export default Header


"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Header() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={200}
        height={100}
        style={{ height: "auto" }} // ✅ preserves aspect ratio
      />



      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={'/auth/sign-in'}>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded">
            Get Started
          </button>
        </Link>
      )}
    </div>
  )
}

export default Header;
