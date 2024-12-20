import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-between bg-slate-800 text-slate-200 shadow-md py-16 px-12 w-full mt-auto mb-0 self-end'>
            <div className="flex justify-between space-x-20 w-1/3">
                <Link href='/'>
                    <div className="flex text-2xl font-bold">ReviewMe</div>
                </Link>
                <div className='grid gap-3'>
                    <p>About</p>
                    <p>Contact</p>
                </div>
            </div>
            <div className='flex items-end'>
            © 2024 ReviewMe.
            </div>
        </div>
    )
}

export default Footer