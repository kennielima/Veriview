"use server"
import { cookies } from "next/headers";

export const deleteReview = async (id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;

    const response = await fetch(`${process.env.API_URL}/api/reviews/${id}`, {
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
    // redirect('/');
}
