import Product from "../models/Product";
import Review from "../models/Review";
import UserRating from "../models/UserRating";

export const calcAverageRating = (
    Product: Product,
    ratingsCount: number,
    rating?: number | null,
    oldRating?: number | null
) => {
    //aggregate ratings from reviews
    let totalReviewRating = Product.reviews && Product.reviews.reduce((sum: number, review: Review) => sum + Number(review.rating), 0);
    //aggregate direct ratings
    let totalRatingSum = Array.isArray(Product.rating) ? Product.rating.reduce((sum: number, rating: UserRating) => sum + Number(rating.productRating), 0) : 0;

    // if (rating != null) {  
    if (rating) { //if there's a new rating, remove previous rating, then add new rating
        if (oldRating) totalRatingSum -= Number(oldRating)
        totalRatingSum += Number(rating)
    }

    //sum of ratings and review ratings
    let totalRating = totalReviewRating + totalRatingSum
    console.log("avdata", totalRating, ratingsCount, rating, oldRating, totalReviewRating, totalRatingSum, Product)

    const averageRating = totalRating / ratingsCount;
    const roundedRating = Math.round(averageRating * 10) / 10;

    return Math.min(Math.max(roundedRating, 1), 5);
}