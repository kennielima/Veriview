"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteReview = async (id: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;

    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `tokenkey=${tokenValue}`,
            },
            credentials: 'include',
        })
        redirect('/');
    } catch (err) {
        console.log("Failed to delete:", err);
    }
}
