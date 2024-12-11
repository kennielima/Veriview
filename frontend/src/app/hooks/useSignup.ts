export interface signupDetails {
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}
const signupUser = async ({ fullName, username, email, password, confirmPassword }: signupDetails) => {
    try {
        const response = await fetch(`${process.env.API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName, username, email, password, confirmPassword })
        })
        const data = await response.json();
        if (!response.ok) {
            console.log('signup failed:', data.message);
            throw new Error('signup failed')
        }
        // TODO: ERROR HANDLING IF USER EXISTS
        console.log(data, fullName, username, email, password, confirmPassword);
        return data;
    } catch (error) {
        console.error("Signup error:", error);
    }
}

export default signupUser;