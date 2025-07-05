import React, { useState } from 'react'
import { motion } from 'framer-motion'
import InputForm from './InputForm'
import MetricCard from './MetricCard'
import HeadlineCard from './HeadlineCard'
import LoadingSpinner from './LoadingSpinner'
import RecentReviews from './RecentReviews'
import CompetitorComparison from './CompetitorComparison'
import PerformanceChart from './PerformanceChart'
import BusinessInsights from './BusinessInsights'
import useBusinessData from '../hooks/useBusinessData'
import { Star, TrendingUp, Users, BarChart3, Award, Target } from 'lucide-react'

const Dashboard = () => {
  const [businessInfo, setBusinessInfo] = useState(null)
  const { data, loading, error, fetchBusinessData, regenerateHeadline } = useBusinessData()

  const handleFormSubmit = async (formData) => {
    setBusinessInfo(formData)
    await fetchBusinessData(formData)
  }

  const handleRegenerateHeadline = async () => {
    if (businessInfo) {
      await regenerateHeadline(businessInfo.name, businessInfo.location)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-primary-500 to-purple-600 text-white mb-4"
          >
            <BarChart3 className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Business Performance Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor your Google Business performance and get AI-powered SEO insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <InputForm onSubmit={handleFormSubmit} loading={loading} />
        </motion.div>

        {loading && <LoadingSpinner />}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6"
          >
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </motion.div>
        )}

        {data && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<Star className="w-6 h-6" />}
                title="Google Rating"
                value={data.rating}
                suffix="/5.0"
                color="yellow"
                delay={0}
              />
              <MetricCard
                icon={<Users className="w-6 h-6" />}
                title="Total Reviews"
                value={data.reviews}
                color="blue"
                delay={0.1}
              />
              <MetricCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Performance Score"
                value={Math.round((data.rating / 5) * 100)}
                suffix="%"
                color="green"
                delay={0.2}
              />
              <MetricCard
                icon={<Award className="w-6 h-6" />}
                title="Category Rank"
                value="#3"
                color="purple"
                delay={0.3}
                              />
            </div>

            {/* SEO Headline Card */}
            <HeadlineCard
              headline={data.headline}
              businessName={businessInfo?.name}
              onRegenerate={handleRegenerateHeadline}
              loading={loading}
            />

            {/* Performance Charts and Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <PerformanceChart monthlyStats={data.monthlyStats} />
              <BusinessInsights insights={data.insights} />
            </div>

            {/* Reviews and Competitor Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <RecentReviews reviews={data.recentReviews} />
              <CompetitorComparison 
                competitors={data.competitors}
                businessRating={data.rating}
                businessReviews={data.reviews}
              />
            </div>

            {/* Action Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            >
              <ActionCard
                icon={<Target className="w-6 h-6" />}
                title="Improve Your Rating"
                description="Respond to reviews and encourage satisfied customers to share their experience"
                color="blue"
                delay={1.0}
              />
              <ActionCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Boost Visibility"
                description="Update your business hours and add fresh photos to attract more customers"
                color="green"
                delay={1.1}
              />
              <ActionCard
                icon={<Award className="w-6 h-6" />}
                title="Stand Out"
                description="Highlight what makes your business unique in your description"
                color="purple"
                delay={1.2}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Action Card Component
const ActionCard = ({ icon, title, description, color, delay }) => {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
    green: 'from-green-400 to-green-600 hover:from-green-500 hover:to-green-700',
    purple: 'from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg cursor-pointer group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  )
}

export default Dashboard