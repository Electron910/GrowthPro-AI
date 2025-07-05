import React from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Sparkles, Copy } from 'lucide-react'

const HeadlineCard = ({ headline, businessName, onRegenerate, loading }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(headline)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg text-white mr-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">AI-Generated SEO Headline</h3>
            <p className="text-sm text-gray-600">Optimized for local search visibility</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Copy headline"
          >
            {copied ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-600"
              >
                ✓
              </motion.span>
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </motion.button>
          
          <motion.button
            onClick={onRegenerate}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Regenerate
          </motion.button>
        </div>
      </div>
      
      <motion.div
        key={headline}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6"
      >
        <p className="text-lg font-medium text-gray-800 leading-relaxed">
          "{headline}"
        </p>
      </motion.div>
      
      <div className="mt-4 flex items-center text-sm text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span>Optimized for: {businessName}</span>
      </div>
    </motion.div>
  )
}

export default HeadlineCard