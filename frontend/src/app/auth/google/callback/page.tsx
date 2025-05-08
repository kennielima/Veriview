"use client"
import { UserTypeProps } from '@/app/Header/HeaderClient';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserTypeProps | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
                cache: 'no-store',
                method: "GET",
                credentials: 'include'
            })
            const data = await response.json();
            console.log(data, response)
            if (response.ok) {
                setUser(data);
            }
        }
        fetchUser();
    }, [])
    console.log(user)

    useEffect(() => {
        if (user?.loggedIn && user.user) {
            router.push('/')
        } else {
            router.push('/auth')
        }
    }, [user, router]);

    return <div className='flex justify-center my-16 font-bold'>Authenticating...</div>
}

export default page;

// const cookieStore = await cookies();
// const token = cookieStore.get('tokenkey')?.value;
// const user = await getCurrentUser();
// if (user.loggedIn) redirect('/');