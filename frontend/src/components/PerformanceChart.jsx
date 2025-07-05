import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Eye, MousePointer } from 'lucide-react'

const PerformanceChart = ({ monthlyStats }) => {
  const maxValue = Math.max(...monthlyStats.map(stat => Math.max(stat.views, stat.clicks)))
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <BarChart3 className="w-6 h-6 mr-2 text-purple-500" />
        Monthly Performance Trends
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Profile Views</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Website Clicks</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="flex items-end justify-between h-48 space-x-2">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end space-x-1 h-40">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(stat.views / maxValue) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {stat.views} views
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(stat.clicks / maxValue) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t-md relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {stat.clicks} clicks
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{stat.month}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">
                {monthlyStats[monthlyStats.length - 1].views}
              </span>
            </div>
            <p className="text-sm text-blue-800 mt-1">Views this month</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <MousePointer className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                {monthlyStats[monthlyStats.length - 1].clicks}
              </span>
            </div>
            <p className="text-sm text-green-800 mt-1">Clicks this month</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PerformanceChart