"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
                // cache: 'no-store',
                method: "GET",
                credentials: 'include'
            })
            const data = await response.json();
            // console.log(data, response)
            if (response.ok) {
                router.push('/')
                router.refresh();
            } else {
                router.push('/auth')
            }
        }
        fetchUser();
    }, []);

    return <div className='flex justify-center my-16 font-bold'>Authenticating...</div>
}

export default page;

// const cookieStore = await cookies();
// const token = cookieStore.get('tokenkey')?.value;
// const user = await getCurrentUser();
// if (user.loggedIn) redirect('/');