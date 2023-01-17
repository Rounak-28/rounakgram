import { signOut } from 'next-auth/react'
import React from 'react'

const SignoutModal = ({ setIsSignoutModalOpen }: any) => {
  return (
    <div className="w-56 h-28 bg-white border-2 border-blue-300 absolute top-16 right-2 shadow-md rounded-lg flex flex-col px-2 pt-2">
        <button
         className='bg-blue-500 text-white py-2 rounded'
         onClick={() => signOut()}
         >
            Sign Out
        </button>
        <button
          className="border-2 mx-auto my-2 bg-gray-100 w-20 h-9 rounded hover:bg-gray-200"
        onClick={() => setIsSignoutModalOpen(false)}
        >
          Cancel
        </button>
    </div>
  )
}

export default SignoutModal