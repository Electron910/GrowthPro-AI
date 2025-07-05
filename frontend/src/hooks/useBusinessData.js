import { useState } from 'react'
import { fetchBusinessData, regenerateHeadline } from '../services/api'

const useBusinessData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (businessInfo) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchBusinessData(businessInfo)
      setData(response)
    } catch (err) {
      setError(err.message || 'Failed to fetch business data')
    } finally {
      setLoading(false)
    }
  }

  const regenerateHeadlineData = async (name, location) => {
    setLoading(true)
    setError(null)
    try {
      const newHeadline = await regenerateHeadline(name, location)
      setData(prev => ({ ...prev, headline: newHeadline }))
    } catch (err) {
      setError(err.message || 'Failed to regenerate headline')
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    fetchBusinessData: fetchData,
    regenerateHeadline: regenerateHeadlineData
  }
}

export default useBusinessData