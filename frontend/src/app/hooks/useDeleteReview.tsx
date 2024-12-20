"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteReview = async (id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;
    // if (!token){
    //     console.log('Please log in to delete review');
    // }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `tokenkey=${tokenValue}`,
                "Authorization": `Bearer ${tokenValue}`,
            },
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error('Failed to delete review');
        }
        redirect('/');
}
