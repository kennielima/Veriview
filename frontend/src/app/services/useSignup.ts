const signupUser = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(Object.fromEntries(formData))
    })
    const data = await response.json();

    if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message);
    }

    window.location.href = '/';
    return data;
}

export default signupUser;