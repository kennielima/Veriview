import Review from "../models/Review";

export const calcAverageRating = (ProductReviews: Review[]) => {
    const totalRating = ProductReviews.reduce((sum, review) => sum + Number(review.rating), 0);

    const averageRating = totalRating / ProductReviews.length;
    const roundedRating = Math.round(averageRating * 10) / 10;
    console.log('RAQ', totalRating, ProductReviews)

    return Math.min(Math.max(roundedRating, 1), 5);
}