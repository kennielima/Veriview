export const fetchReviews = async (page?: number, sort?: string, order?: string, limit?: number) => {
    let query = [
        page && `page=${page}`,
        sort && `order=${sort}`,
        order && `order=${order}`,
        limit ? `limit=${limit}` : `limit=5`,
    ]
        .filter(Boolean)
        .join("&");
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?${query}`, {
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


