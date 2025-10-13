import React, { useState } from 'react';
import { Search, Star, ThumbsUp, MessageCircle, Send, User, Calendar, Package } from 'lucide-react';

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  sellerResponse?: {
    text: string;
    responseDate: string;
  };
}

const ReviewSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');

  // Sample reviews data - replace with your backend data
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      productId: '1',
      productName: 'Premium Wireless Headphones',
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      customerName: 'Rakib Hasan',
      customerAvatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      reviewText: 'Absolutely amazing headphones! The sound quality is crystal clear and the noise cancellation is top-notch. Battery life exceeds expectations. Highly recommend!',
      reviewDate: '2025-10-12T14:30:00',
      verified: true,
      helpful: 24,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop'
      ]
    },
    {
      id: '2',
      productId: '2',
      productName: 'Smart Watch Pro Series',
      productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      customerName: 'Fatima Ahmed',
      customerAvatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4,
      reviewText: 'Great smartwatch with lots of features. The fitness tracking is accurate and the battery lasts about 2 days with normal use. The only downside is the charging cable is a bit short.',
      reviewDate: '2025-10-11T09:15:00',
      verified: true,
      helpful: 18,
      sellerResponse: {
        text: 'Thank you for your feedback! We\'re glad you\'re enjoying the watch. We\'ll pass along your comment about the charging cable to our product team.',
        responseDate: '2025-10-11T15:20:00'
      }
    },
    {
      id: '3',
      productId: '5',
      productName: 'Mechanical Keyboard',
      productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
      customerName: 'Imran Khan',
      customerAvatar: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      reviewText: 'Perfect for gaming and typing. The mechanical switches feel premium and the RGB lighting is customizable. Build quality is solid. Worth every penny!',
      reviewDate: '2025-10-10T18:45:00',
      verified: true,
      helpful: 31,
      images: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop'
      ]
    },
    {
      id: '4',
      productId: '4',
      productName: 'Gaming Mouse RGB',
      productImage: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      customerName: 'Sadia Rahman',
      customerAvatar: 'https://i.pravatar.cc/150?img=9',
      rating: 3,
      reviewText: 'Decent mouse for the price. RGB lighting is nice but the software is a bit buggy. The sensor is good but not perfect for competitive gaming.',
      reviewDate: '2025-10-09T12:20:00',
      verified: true,
      helpful: 12
    },
    {
      id: '5',
      productId: '6',
      productName: 'Cotton T-Shirt Pack',
      productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      customerName: 'Mahbub Alam',
      customerAvatar: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      reviewText: 'Excellent quality cotton! Very comfortable and fits perfectly. The colors haven\'t faded after multiple washes. Great value for money.',
      reviewDate: '2025-10-08T16:30:00',
      verified: true,
      helpful: 45,
      sellerResponse: {
        text: 'Thank you so much for your positive review! We\'re thrilled that you\'re satisfied with the quality and comfort of our t-shirts.',
        responseDate: '2025-10-09T10:15:00'
      }
    },
    {
      id: '6',
      productId: '1',
      productName: 'Premium Wireless Headphones',
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      customerName: 'Nazmin Akter',
      customerAvatar: 'https://i.pravatar.cc/150?img=20',
      rating: 2,
      reviewText: 'Not what I expected. The noise cancellation doesn\'t work as advertised and the battery drains faster than mentioned. Disappointed with this purchase.',
      reviewDate: '2025-10-07T11:00:00',
      verified: true,
      helpful: 8
    }
  ]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleSubmitResponse = (reviewId: string) => {
    console.log('Submitting response for review:', reviewId, 'Response:', responseText);
    setRespondingTo(null);
    setResponseText('');
    // Add your API call here
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    return matchesSearch && matchesRating;
  });

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const fourStarCount = reviews.filter(r => r.rating === 4).length;
  const threeStarCount = reviews.filter(r => r.rating === 3).length;
  const respondedCount = reviews.filter(r => r.sellerResponse).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
          <p className="text-gray-600">View and respond to customer feedback</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Average Rating</span>
              <Star className="text-yellow-400 fill-yellow-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            <p className="text-gray-500 text-sm mt-1">Out of 5.0</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Reviews</span>
              <MessageCircle className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
            <p className="text-gray-500 text-sm mt-1">All time</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">5 Star Reviews</span>
              <Star className="text-yellow-400 fill-yellow-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{fiveStarCount}</p>
            <p className="text-gray-500 text-sm mt-1">{((fiveStarCount / totalReviews) * 100).toFixed(0)}% of total</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Responded</span>
              <Send className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{respondedCount}</p>
            <p className="text-gray-500 text-sm mt-1">{((respondedCount / totalReviews) * 100).toFixed(0)}% response rate</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(star => {
              const count = reviews.filter(r => r.rating === star).length;
              const percentage = (count / totalReviews) * 100;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-8">{star} ★</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">{count} ({percentage.toFixed(0)}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search reviews by customer, product, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                {/* Review Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {review.customerAvatar ? (
                      <img
                        src={review.customerAvatar}
                        alt={review.customerName}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="text-gray-500" size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                          {review.verified && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded border border-green-200">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-500">
                            <Calendar size={14} className="inline mr-1" />
                            {formatDate(review.reviewDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-12 h-12 object-cover rounded border border-gray-200"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{review.productName}</p>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Package size={12} />
                          Product Review
                        </span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-3 leading-relaxed">{review.reviewText}</p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Review ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                          />
                        ))}
                      </div>
                    )}

                    {/* Helpful Count */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                        <ThumbsUp size={16} />
                        <span>{review.helpful} people found this helpful</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seller Response */}
                {review.sellerResponse ? (
                  <div className="mt-4 ml-16 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <User className="text-white" size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Seller Response</span>
                          <span className="text-xs text-gray-500">
                            {formatDate(review.sellerResponse.responseDate)}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{review.sellerResponse.text}</p>
                      </div>
                    </div>
                  </div>
                ) : respondingTo === review.id ? (
                  <div className="mt-4 ml-16 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Your Response</h4>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={4}
                      placeholder="Write your response to this review..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none mb-3"
                    ></textarea>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSubmitResponse(review.id)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                      >
                        <Send size={16} />
                        Post Response
                      </button>
                      <button
                        onClick={() => {
                          setRespondingTo(null);
                          setResponseText('');
                        }}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 ml-16">
                    <button
                      onClick={() => setRespondingTo(review.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                    >
                      <MessageCircle size={16} />
                      Respond to Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <MessageCircle className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;