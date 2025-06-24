"use server"
import { cookies } from "next/headers";

const createReview = async (title: string, brand: string, content: string, rating: number, anonymous: boolean, images?: File[]) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;
    const uploadedImageUrls: string[] = [];

    if (images?.length) {
        for (const image of images) {
            const presignURL = await fetch(
                `${process.env.API_URL}/api/presign-images?fileName=${image.name}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        Cookie: `tokenkey=${tokenValue}`,
                    },
                    credentials: 'include',
                });
            if (!presignURL.ok) {
                const errorText = await presignURL.text();
                console.error('Failed to get presigned URL:', errorText);
                throw new Error(`Failed to get presigned URL: ${errorText}`);
            }
            const { url, publicUrl } = await presignURL.json();

            const uploadImage = await fetch(`${url}`, {
                method: "PUT",
                headers: {
                    "Content-Type": image.type,
                },
                body: image
            })

            if (!uploadImage.ok) {
                const errorData = await uploadImage.json();
                const message = errorData?.message || 'Failed to upload image';
                console.error('error uploading to cloudflare:', errorData);
                throw new Error(message || 'Failed to upload image to cloudflare');
            }
            uploadedImageUrls.push(publicUrl)
        }
    }


    const response = await fetch(`${process.env.API_URL}/api/create-review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenValue}`,
            "Cookie": `tokenkey=${tokenValue}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            title,
            content,
            rating,
            brand,
            anonymous,
            images: uploadedImageUrls
        })
    })

    if (!response.ok) {
        const errorData = await response.json();
        const message = errorData?.message || 'Failed to post review';
        throw new Error(message || 'Failed to post review');
    }
}

export default createReview;