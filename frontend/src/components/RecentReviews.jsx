import React from 'react'
import { motion } from 'framer-motion'
import { Star, User } from 'lucide-react'

const RecentReviews = ({ reviews }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <User className="w-6 h-6 mr-2 text-primary-500" />
        Recent Customer Reviews
      </h3>
      
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-gray-100 pb-4 last:border-0"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">{review.author}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mt-1 mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full text-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
      >
        View All Reviews →
      </motion.button>
    </motion.div>
  )
}

export default RecentReviews