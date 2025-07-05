import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Building2, MapPin } from 'lucide-react'
import { searchBusinesses } from '../services/api'

const Autocomplete = ({ value, onChange, onSelect, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const debounceTimer = useRef(null)

  // Handle search with debounce
  useEffect(() => {
    if (value.length < 1) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new timer
    debounceTimer.current = setTimeout(async () => {
      setLoading(true)
      try {
        const results = await searchBusinesses(value)
        setSuggestions(results)
        setIsOpen(results.length > 0)
      } catch (error) {
        console.error('Search error:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300) // 300ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [value])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSelect = (suggestion) => {
    onSelect(suggestion)
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const getCategoryColor = (category) => {
    const colors = {
      Restaurant: 'bg-orange-100 text-orange-800',
      Bakery: 'bg-yellow-100 text-yellow-800',
      Salon: 'bg-pink-100 text-pink-800',
      Gym: 'bg-green-100 text-green-800',
      Cafe: 'bg-brown-100 text-brown-800',
      Technology: 'bg-blue-100 text-blue-800',
      Marketing: 'bg-purple-100 text-purple-800',
      Design: 'bg-indigo-100 text-indigo-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="relative">
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 1 && suggestions.length > 0 && setIsOpen(true)}
          className={`input-field pl-10 pr-10 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder={placeholder}
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
          >
            <ul className="max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary-50 border-l-4 border-primary-500'
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                  onClick={() => handleSelect(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{suggestion.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center text-xs text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {suggestion.location}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(suggestion.category)}`}>
                          {suggestion.category}
                        </span>
                      </div>
                    </div>
                    {index === selectedIndex && (
                      <Search className="w-4 h-4 text-primary-500" />
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
            
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                Press ↑↓ to navigate, Enter to select, Esc to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && suggestions.length === 0 && !loading && value.length >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
        >
          <p className="text-sm text-gray-600 text-center">
            No businesses found. Try a different search term.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default Autocomplete