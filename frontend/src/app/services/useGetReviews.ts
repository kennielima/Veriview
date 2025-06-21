"use server"
export const fetchReviews = async (page?: number, sort?: string, limit?: number) => {
    let queryString = [
        page && `page=${page}`,
        sort && `sort=${sort}`,
        limit ? `limit=${limit}` : `limit=5`,
    ]
        .filter(Boolean)
        .join("&");

    try {
        const response = await fetch(`${process.env.API_URL}/api/reviews?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const Reviews = await response.json();
        return Reviews;
    } catch (err) {
        console.log("Failed to fetch reviews:", err);
    }
}

export const fetchReview = async (id: string) => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/reviews/${id}`, {
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


