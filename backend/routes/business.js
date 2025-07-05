import express from 'express'
import { generateBusinessData, generateNewHeadline } from '../utils/dataGenerator.js'
import { searchBusinesses } from '../utils/mockBusinessDatabase.js'

const router = express.Router()

// Add example businesses endpoint
router.get('/example-businesses', (req, res) => {
  const examples = [
    { name: "The Gourmet Kitchen", location: "Mumbai" },
    { name: "Sweet Dreams Bakery", location: "Delhi" },
    { name: "Glamour Beauty Salon", location: "Bangalore" },
    { name: "FitLife Gym & Wellness", location: "Chennai" }
  ]
  res.json(examples)
})

// GET /search-businesses
router.get('/search-businesses', (req, res) => {
  try {
    const { q, limit = 5 } = req.query
    
    if (!q) {
      return res.json([])
    }
    
    const results = searchBusinesses(q, parseInt(limit))
    
    // Return simplified results for autocomplete
    const suggestions = results.map(business => ({
      id: business.id,
      name: business.name,
      location: business.location,
      category: business.category,
      displayText: `${business.name} - ${business.location}`
    }))
    
    res.json(suggestions)
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to search businesses',
      error: error.message 
    })
  }
})

// POST /business-data
router.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body
    
    if (!name || !location) {
      return res.status(400).json({ 
        message: 'Business name and location are required' 
      })
    }

    const businessData = generateBusinessData(name, location)
    
    // Simulate delay to show loading state
    setTimeout(() => {
      res.json(businessData)
    }, 1500) // Increased delay for better UX
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to generate business data',
      error: error.message 
    })
  }
})

// GET /regenerate-headline
router.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query
    
    if (!name || !location) {
      return res.status(400).json({ 
        message: 'Business name and location are required' 
      })
    }

    const newHeadline = generateNewHeadline(name, location)
    
    // Simulate delay
    setTimeout(() => {
      res.json({ headline: newHeadline })
    }, 800)
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to generate headline',
      error: error.message 
    })
  }
})

export default router