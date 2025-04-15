"use server"

const Search = async ({ q, category }: { q: string, category: string }) => {
    try {
        const response = await fetch(`${process.env.API_URL}/search?q=${q}&category=${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await response.json();

        if (!response.ok) {
            console.log("response is not ok:", response);
        }
        return data;

    } catch (error) {
        throw new Error('failed to search:' + error);
    }
}

export default Search;