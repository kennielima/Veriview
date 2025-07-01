const loginUser = async (formData: FormData) => {
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(Object.fromEntries(formData))
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    window.location.href = '/';
    return data;
}

export default loginUser;

export const logout = async () => {
    const response = await fetch(`/api/auth/logout`, {
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