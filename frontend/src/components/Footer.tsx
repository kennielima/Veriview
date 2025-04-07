import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col md:flex-row justify-between bg-slate-800 text-slate-200 shadow-md py-16 px-12 w-full mt-auto mb-0 self-end'>
            <div className="flex justify-between space-x-20 w-full md:w-1/3">
                <div className='flex flex-col gap-4'>
                    <Link href='/'>
                        <div className="flex text-2xl font-bold">ReviewMe</div>
                    </Link>
                    <div className='sm:hidden items-end flex'>© 2024 ReviewMe</div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:space-x-20'>
                    <div className='grid gap-3'>
                        <Link href='/products'>Brands</Link>
                        <p>Contact</p>
                    </div>
                    <div className='grid gap-3'>
                        <p>Terms</p>
                        <p>Privacy</p>
                    </div>
                </div>
            </div>
            <div className='sm:flex items-end hidden'>© 2024 ReviewMe</div>
        </div>
    )
}

export default Footer