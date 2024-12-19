"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const createReview = async (title: string, content: string, rating: number) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `tokenkey=${tokenValue}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            title,
            content,
            rating
        })
    })
    const newReview = await response.json();
    console.log(newReview, process.env.NEXT_PUBLIC_API_URL);
    redirect('/')
    //   return review
}

export default createReview