import Review from "../models/Review";

export const calcAverageRating = (
    ProductReviews: Review[],
    ratingsCount: number,
    rating?: number | null,
) => {
    let totalRating = ProductReviews.reduce((sum, review) => sum + Number(review.rating), 0);

    if (rating) {
        totalRating += Number(rating)
    }
    const averageRating = totalRating / ratingsCount;
    const roundedRating = Math.round(averageRating * 10) / 10;
    return Math.min(Math.max(roundedRating, 1), 5);
}