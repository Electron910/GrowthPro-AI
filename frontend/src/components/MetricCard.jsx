import React from 'react'
import { motion } from 'framer-motion'

const MetricCard = ({ icon, title, value, suffix = '', color = 'blue', delay = 0 }) => {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    yellow: 'from-yellow-400 to-yellow-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="metric-card relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} text-white mb-4`}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">
          {value}
          <span className="text-lg font-normal text-gray-500">{suffix}</span>
        </p>
      </div>
            <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-r ${colorClasses[color]} opacity-10 rounded-full`}></div>
    </motion.div>
  )
}

export default MetricCard