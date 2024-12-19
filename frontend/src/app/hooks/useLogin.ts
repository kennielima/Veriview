const loginUser = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(Object.fromEntries(formData))
    })
    const data = await response.json();

    if (!response.ok) {
        console.log('client data', data.message, data.token, data.tokenkey);
        throw new Error(data.message);
    }
    window.location.href = '/';
    return data;
}

export default loginUser;

export const logout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    window.location.href = '/';
    return data;
}