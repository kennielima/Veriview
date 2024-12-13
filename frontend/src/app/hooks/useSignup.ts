const signupUser = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
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

        // TODO: ERROR HADNLING IF USER DOESNT EXIST
    console.log("formData", formData);
    return data;
}

export default signupUser;