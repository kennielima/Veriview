import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className="flex space-x-20 bg-slate-200 shadow-md py-16 px-8 w-full mt-auto mb-0 self-end">
            <Link href='/'>
                <div className="flex text-2xl font-bold text-gray-800">ReviewMe</div>
            </Link>
            <div className='grid gap-3'>
                <p>About</p>
                <p>Contact</p>
            </div>
        </div>
    )
}

export default Footer