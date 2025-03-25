import Review from "../models/Review";

export const calcAverageRating = (
    ProductReviews: Review[],
    ratingsCount: number,
    newRating?: number | null,
    oldRating?: number | null
) => {
    let totalRating = ProductReviews.reduce((sum, review) => sum + Number(review.rating), 0);
    if (oldRating) {
        totalRating -= Number(oldRating)
    }
    if (newRating) {
        totalRating += Number(newRating)
    }
    console.log(ratingsCount, ProductReviews.length)
    const averageRating = totalRating / ratingsCount;
    const roundedRating = Math.round(averageRating * 10) / 10;
    console.log('RAQ', totalRating, ProductReviews, averageRating,)

    return Math.min(Math.max(roundedRating, 1), 5);
}