import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Clock, Calendar, MessageCircle, TrendingUp } from 'lucide-react'

const BusinessInsights = ({ insights }) => {
  const insightCards = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Monthly Growth",
      value: insights.viewsTrend,
      color: insights.viewsTrend.startsWith('+') ? 'green' : 'red',
      description: "Profile views vs last month"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Peak Hours",
      value: insights.peakHours,
      color: 'blue',
      description: "Most active time"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Busiest Day",
      value: insights.popularDay,
      color: 'purple',
      description: "Most customer engagement"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Response Rate",
      value: insights.responseRate,
      color: 'orange',
      description: "Customer inquiries answered"
    }
  ]

  const colorClasses = {
    green: 'from-green-400 to-green-600 text-green-600 bg-green-50 border-green-200',
    red: 'from-red-400 to-red-600 text-red-600 bg-red-50 border-red-200',
    blue: 'from-blue-400 to-blue-600 text-blue-600 bg-blue-50 border-blue-200',
    purple: 'from-purple-400 to-purple-600 text-purple-600 bg-purple-50 border-purple-200',
    orange: 'from-orange-400 to-orange-600 text-orange-600 bg-orange-50 border-orange-200'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
        Business Insights & Analytics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insightCards.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl border-2 ${colorClasses[insight.color].split(' ').slice(2).join(' ')}`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${colorClasses[insight.color].split(' ').slice(0, 2).join(' ')} text-white mb-3`}>
              {insight.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{insight.value}</p>
            <p className="text-sm font-medium text-gray-700">{insight.label}</p>
            <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
      >
        <p className="text-sm text-gray-800">
          <span className="font-semibold">💡 Pro tip:</span> Post updates during your peak hours ({insights.peakHours}) 
          on {insights.popularDay}s to maximize engagement!
        </p>
      </motion.div>
    </motion.div>
  )
}

export default BusinessInsights