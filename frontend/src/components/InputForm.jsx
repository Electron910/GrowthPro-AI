import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search, Sparkles, ChevronDown } from 'lucide-react'
import { exampleBusinesses } from '../data/exampleBusinesses'
import Autocomplete from './Autocomplete'

const InputForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  })
  const [showExamples, setShowExamples] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required'
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    onSubmit(formData)
  }

  const handleBusinessSelect = (suggestion) => {
    setFormData({
      name: suggestion.name,
      location: suggestion.location
    })
    setErrors({})
  }

  const handleLocationChange = (e) => {
    const { value } = e.target
    setFormData(prev => ({ ...prev, location: value }))
    
    // Clear error when user starts typing
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: '' }))
    }
  }

  const fillExample = (example) => {
    setFormData({
      name: example.name,
      location: example.location
    })
    setShowExamples(false)
    setErrors({})
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Enter Your Business Details
            </h2>
            <motion.button
              type="button"
              onClick={() => setShowExamples(!showExamples)}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              Try Examples
              <ChevronDown className={`w-4 h-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          <AnimatePresence>
            {showExamples && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3">
                  {exampleBusinesses.slice(0, 4).map((example, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => fillExample(example)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3 bg-gradient-to-r from-gray-50 to-primary-50 rounded-lg text-left hover:from-primary-50 hover:to-primary-100 transition-all"
                    >
                      <p className="font-medium text-gray-800 text-sm">{example.name}</p>
                      <p className="text-xs text-gray-600">{example.location}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <Autocomplete
                value={formData.name}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, name: value }))
                  if (errors.name) {
                    setErrors(prev => ({ ...prev, name: '' }))
                  }
                }}
                onSelect={handleBusinessSelect}
                placeholder="e.g., Cake & Co"
                error={errors.name}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationChange}
                  className={`input-field pl-10 ${errors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="e.g., Mumbai"
                />
              </div>
              {errors.location && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.location}
                </motion.p>
              )}
            </motion.div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="mt-8 w-full btn-primary flex items-center justify-center relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing your business...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Analyze Business Performance
                </>
              )}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <p className="text-center text-xs text-gray-500 mt-4">
            Start typing to see suggestions from our database of businesses
          </p>
        </div>
      </motion.form>
    </motion.div>
  )
}

export default InputForm