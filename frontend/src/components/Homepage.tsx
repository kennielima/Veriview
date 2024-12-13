import React from 'react';
import ReviewCard from './Card';


const Homepage = ({Reviews}: any) => {
  return (
    <div className="container px-16 py-8 mx-auto">
      
      <div className="space-y-4">
        {Reviews.map((review: any) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;