export const fetchReviews = async () => {
    try {
        const response = await fetch(`${process.env.API_URL}`, {
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

export const fetchReview = async (id: string) => {
    try {
        const response = await fetch(`${process.env.API_URL}/reviews/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const Review = await response.json()
        return Review;
    } catch (err) {
        console.log("Failed to fetch reviews:", err);
    }

}


