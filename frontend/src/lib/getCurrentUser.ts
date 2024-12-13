import { cookies } from "next/headers"

const getCurrentUser = async () => {
        const cookieStore = await cookies()
        const token = cookieStore.get('tokenkey')
        const tokenValue = token?.value;
        console.log('token:', token, tokenValue, 'All cookies:', cookieStore.getAll())
        if (!token) {
            return { loggedIn: false, message: 'No token found' };
        }
        try {
        const response = await fetch(`${process.env.API_URL}/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `tokenkey=${tokenValue}`,
            },
            credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user status:", error);
        return null;
    }
}

export default getCurrentUser