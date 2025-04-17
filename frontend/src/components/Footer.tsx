import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col md:flex-row justify-between bg-indigo-800 text-white shadow-md py-16 px-12 w-full mt-auto mb-0 self-end'>
            <div className="flex justify-between space-x-20 w-full md:w-1/3">
                <div className='flex flex-col gap-4'>
                    <Link href='/'>
                        <div className="flex text-2xl font-bold">ReviewHub</div>
                    </Link>
                    <div className='sm:hidden items-end flex'>© 2024 ReviewHub</div>
                </div>
                <div className='flex flex-col md:flex-row gap-3 md:space-x-20'>
                    <div className='flex flex-col gap-3 w-max'>
                        <Link href='/products'>Brands</Link>
                        <p>Contact</p>
                    </div>
                    <div className='flex flex-col gap-3 w-max'>
                        {/* <p>Terms</p>
                        <p>Privacy</p> */}
                        <p>FAQ</p>
                        <p>What we do</p>
                    </div>
                </div>
            </div>
            <div className='sm:flex items-end hidden'>© 2024 ReviewHub</div>
        </div>
    )
}

export default Footer