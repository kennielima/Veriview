import { cookies } from "next/headers"

export const getCurrentUserData = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;
    if (!token) {
        return { loggedIn: false, message: 'No token found' };
    }
    try {
        const response = await fetch(`${process.env.API_URL}/getCurrentUserData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `tokenkey=${tokenValue}`,
                "Authorization": `Bearer ${tokenValue}`,
            },
            credentials: 'include'
        })

        const data = await response.json();

        if (response.ok) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user status:", error);
        return null;
    }
}

export const getAUser = async (userId: string) => {
    try {
        const response = await fetch(`${process.env.API_URL}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await response.json();

        if (response.ok) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user status:", error);
        return null;
    }
}

export const getUserRateHelpful = async (userId: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;
    if (!token) {
        return { loggedIn: false, message: 'No token found' };
    }
    try {
        const response = await fetch(`${process.env.API_URL}/users/${userId}/ratedhelpful`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `tokenkey=${tokenValue}`,
                "Authorization": `Bearer ${tokenValue}`,
            },
            credentials: 'include'
        })

        const data = await response.json();

        if (response.ok) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user ratedhelpful:", error);
        return null;
    }
}

export const getProductRating = async (userId: string) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('tokenkey')
    const tokenValue = token?.value;
    if (!token) {
        return { loggedIn: false, message: 'No token found' };
    }
    try {
        const response = await fetch(`${process.env.API_URL}/users/${userId}/productrating`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `tokenkey=${tokenValue}`,
                "Authorization": `Bearer ${tokenValue}`,
            },
            credentials: 'include'
        })

        const data = await response.json();

        if (response.ok) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user productrating:", error);
        return null;
    }
}