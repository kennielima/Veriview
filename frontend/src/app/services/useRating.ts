"use server"
import { cookies } from "next/headers";

export const rateProduct = async (rating: number, id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;

    try {
        const response = await fetch(`${process.env.API_URL}/api/products/${id}/rate`, {
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
        // redirect('/');
    } catch (error) {
        console.error('failed to send product rating:', error);
    }
}


export const rateHelpful = async (ratedHelpful: boolean, id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;

    try {
        const response = await fetch(`${process.env.API_URL}/api/reviews/${id}/ratehelpful`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenValue}`,
                "Cookie": `tokenkey=${tokenValue}`,
            },
            body: JSON.stringify({
                ratedHelpful
            })
        })

        if (!response.ok) {
            throw new Error('Failed to rate as helpful');
        }
        // redirect('/');
    } catch (error) {
        console.error('failed to rate as helpful:', error);
    }
}