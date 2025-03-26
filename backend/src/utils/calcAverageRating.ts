import Product from "../models/Product";
import Review from "../models/Review";
import UserRating from "../models/UserRating";

export const calcAverageRating = (
    Product: Product,
    ratingsCount: number,
    rating?: number | null,
    oldRating?: number | null
) => {
    let totalReviewRating = Product.reviews && Product.reviews.reduce((sum: number, review: Review) => sum + Number(review.rating), 0);
    let totalRatingCount = Array.isArray(Product.rating) ? Product.rating.reduce((sum: number, rating: UserRating) => sum + Number(rating.productRating), 0) : 0;

    if (rating) {
        if (oldRating) totalRatingCount -= Number(oldRating)
        totalRatingCount += Number(rating)
    }

    let totalRating = totalReviewRating + totalRatingCount
    console.log("avdata", totalRating, ratingsCount, rating, oldRating, Product.rating)

    const averageRating = totalRating / ratingsCount;
    const roundedRating = Math.round(averageRating * 10) / 10;

    return Math.min(Math.max(roundedRating, 1), 5);
}