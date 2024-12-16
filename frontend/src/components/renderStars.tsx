import { Star } from 'lucide-react';

const RenderStars = (rating: {rating: number}) => {
    return Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`h-5 w-5 ${index < (Number(rating)) ? 'text-yellow-500' : 'text-gray-300'}`}
            fill={index < (Number(rating)) ? 'currentColor' : 'none'}
        />
    ));
}
export default RenderStars