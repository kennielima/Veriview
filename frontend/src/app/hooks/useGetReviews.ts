export const fetchReviews = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const Reviews = await response.json()
        return Reviews;
    } catch (err) {
        console.log("Failed to fetch reviews:", err);
    }

}


