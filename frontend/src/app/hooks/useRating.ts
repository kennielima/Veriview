"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const rateProduct = async (rating: number, id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenValue}`,
                "Cookie": `tokenkey=${tokenValue}`,
            },
            credentials: 'include',
            body: JSON.stringify({
                rating
            })
        })

        if (!response.ok || !response) {
            throw new Error('Failed to review product');
        }
        redirect('/');
    } catch (error) {
        console.error('failed to send product rating:', error);
    }
}
