'use client';

import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      author: 'Amani Mwokasege',
      rating: 5,
      timeAgo: '2 weeks ago',
      text: 'Outstanding innovation! The SolaPump Pro has transformed irrigation for our cooperative.'
    },
    {
      id: 2,
      author: 'Moses Kiggundu',
      rating: 4,
      timeAgo: '1 month ago',
      text: 'Very reliable system. Installation was smooth, and the customer support is excellent.'
    },
    {
      id: 3,
      author: 'Thandi Nkosi',
      rating: 5,
      timeAgo: '2 months ago',
      text: 'Incredible work! This is exactly what African agriculture needs. Well designed and affordable.'
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 18 },
    { stars: 4, count: 4 },
    { stars: 3, count: 1 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ];

  const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0);
  const averageRating = (
    ratingDistribution.reduce((sum, item) => sum + item.stars * item.count, 0) / totalReviews
  ).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reviews</h1>
        {/* Rating Summary */}
        <div className="flex flex-col lg:flex-row items-center bg-yellow-50 gap-8 mb-8 pb-8 py-3 px-2 rounded-md">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2 h-full">{averageRating}</div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">{totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-12">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-full"
                    style={{
                      width: `${totalReviews > 0 ? (item.count / Math.max(...ratingDistribution.map(r => r.count))) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="w-8 text-right text-sm text-gray-600 font-semibold">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="hidden lg:flex w-10 h-10 bg-linear-to-br from-gray-700 to-gray-900 rounded-full shrink-0" />

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? 'fill-orange-400 text-orange-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-2">{review.timeAgo}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs lg:text-sm text-gray-700">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
