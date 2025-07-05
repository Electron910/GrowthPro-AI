import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

console.log('API URL:', API_BASE_URL) // For debugging, remove in production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
})

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('Making request to:', config.url)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      console.error('Network Error:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export const fetchBusinessData = async (businessInfo) => {
  try {
    const response = await api.post('/business-data', businessInfo)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch business data')
  }
}

export const regenerateHeadline = async (name, location) => {
  try {
    const response = await api.get('/regenerate-headline', {
      params: { name, location }
    })
    return response.data.headline
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to regenerate headline')
  }
}

export const searchBusinesses = async (query) => {
  try {
    const response = await api.get('/search-businesses', {
      params: { q: query, limit: 5 }
    })
    return response.data
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}