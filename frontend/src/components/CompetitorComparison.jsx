import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users } from 'lucide-react'

const CompetitorComparison = ({ competitors, businessRating, businessReviews }) => {
  const maxRating = 5
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
        Competitor Analysis
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border-2 border-primary-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-800">Your Business</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary-600">{businessRating}</span>
              <span className="text-sm text-gray-600">({businessReviews} reviews)</span>
            </div>
          </div>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(businessRating / maxRating) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
            />
          </div>
        </div>
        
        {competitors.map((competitor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">{competitor.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-700">{competitor.rating}</span>
                <span className="text-sm text-gray-600">({competitor.reviews} reviews)</span>
              </div>
            </div>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(competitor.rating / maxRating) * 100}%` }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                className="absolute h-full bg-gray-400 rounded-full"
              />
            </div>
                      </motion.div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          <span className="font-semibold">Great job!</span> Your business is performing 
          {businessRating >= 4.5 ? ' excellently' : ' well'} compared to local competitors.
        </p>
      </div>
    </motion.div>
  )
}

export default CompetitorComparison