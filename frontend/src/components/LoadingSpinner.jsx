import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-20 h-20 rounded-full border-4 border-gray-200"></div>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="w-20 h-20 rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </motion.div>
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">Analyzing your business data...</p>
    </motion.div>
  )
}

export default LoadingSpinner