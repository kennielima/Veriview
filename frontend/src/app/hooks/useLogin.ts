const loginUser = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    const response = await fetch(`${process.env.API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    const data = await response.json();

    if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message);
    }
        // TODO: ERROR HADNLING IF USER DOESNT EXIST
    console.log(email, password, response);
    return data;
}

export default loginUser;