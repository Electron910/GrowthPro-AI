// Enhanced data generator with more realistic data

const businessCategories = {
  restaurant: {
    headlines: [
      "Why {name} Serves the Best {cuisine} in {location}",
      "{name}: Where {location} Comes for Authentic Flavors",
      "Experience Fine Dining at {name} - {location}'s Hidden Gem",
      "{location}'s Top-Rated Restaurant: {name} Delivers Excellence"
    ],
    cuisines: ["Italian", "Indian", "Chinese", "Mexican", "Thai", "Japanese", "Mediterranean"]
  },
  bakery: {
    headlines: [
      "{name}: Home of {location}'s Freshest Baked Goods",
      "Sweet Dreams Come True at {name} in {location}",
      "Why {location} Loves {name}'s Artisan Breads",
      "{name}: Baking Happiness in {location} Since Day One"
    ],
    specialties: ["Croissants", "Sourdough", "Cupcakes", "Wedding Cakes", "Donuts"]
  },
  salon: {
    headlines: [
      "{name}: Where {location} Gets Beautiful",
      "Transform Your Look at {name} - {location}'s Premier Salon",
      "{location}'s Style Destination: {name} Beauty Studio",
      "Expert Hair & Beauty Services at {name} in {location}"
    ],
    services: ["Hair Styling", "Manicures", "Facials", "Hair Coloring", "Spa Treatments"]
  },
  fitness: {
    headlines: [
      "Get Fit at {name} - {location}'s Top Gym",
      "{name}: Transforming {location} One Workout at a Time",
      "Why {location} Chooses {name} for Fitness Goals",
      "Join the Fitness Revolution at {name} in {location}"
    ],
    classes: ["Yoga", "CrossFit", "Pilates", "Zumba", "Strength Training"]
  }
}

const reviews = [
  {
    author: "Sarah Johnson",
    rating: 5,
    text: "Absolutely amazing experience! The staff was incredibly friendly and professional.",
    date: "2 days ago",
    avatar: "SJ"
  },
  {
    author: "Mike Chen",
    rating: 4,
    text: "Great service and reasonable prices. Will definitely come back!",
    date: "1 week ago",
    avatar: "MC"
  },
  {
    author: "Emily Rodriguez",
    rating: 5,
    text: "Best in town! Exceeded all my expectations. Highly recommend to everyone.",
    date: "2 weeks ago",
    avatar: "ER"
  },
  {
    author: "David Park",
    rating: 5,
    text: "Outstanding quality and attention to detail. A true gem in the community!",
    date: "3 weeks ago",
    avatar: "DP"
  },
  {
    author: "Lisa Thompson",
    rating: 4,
    text: "Very satisfied with the service. The atmosphere is welcoming and comfortable.",
    date: "1 month ago",
    avatar: "LT"
  }
]

const competitorData = [
  { name: "Competitor A", rating: 4.2, reviews: 89 },
  { name: "Competitor B", rating: 3.9, reviews: 156 },
  { name: "Competitor C", rating: 4.5, reviews: 234 },
  { name: "Local Average", rating: 4.0, reviews: 120 }
]

const monthlyStats = [
  { month: "Jan", views: 450, clicks: 89 },
  { month: "Feb", views: 520, clicks: 102 },
  { month: "Mar", views: 680, clicks: 145 },
  { month: "Apr", views: 790, clicks: 178 },
  { month: "May", views: 920, clicks: 210 },
  { month: "Jun", views: 1100, clicks: 256 }
]

const generateRating = () => {
  return (Math.random() * 1.5 + 3.5).toFixed(1)
}

const generateReviews = () => {
  return Math.floor(Math.random() * 450) + 50
}

const getBusinessCategory = (name) => {
  const nameLower = name.toLowerCase()
  if (nameLower.includes('restaurant') || nameLower.includes('cafe') || nameLower.includes('bistro')) {
    return 'restaurant'
  } else if (nameLower.includes('bakery') || nameLower.includes('cake')) {
    return 'bakery'
  } else if (nameLower.includes('salon') || nameLower.includes('beauty')) {
    return 'salon'
  } else if (nameLower.includes('gym') || nameLower.includes('fitness')) {
    return 'fitness'
  }
  return 'restaurant' // default
}

export const generateBusinessData = (name, location) => {
  const rating = parseFloat(generateRating())
  const reviewCount = generateReviews()
  const category = getBusinessCategory(name)
  const categoryData = businessCategories[category]
  
  // Generate headline
  const headlines = categoryData.headlines
  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]
  let headline = randomHeadline.replace('{name}', name).replace('{location}', location)
  
  // Add cuisine/specialty for certain categories
  if (category === 'restaurant' && randomHeadline.includes('{cuisine}')) {
    const cuisine = categoryData.cuisines[Math.floor(Math.random() * categoryData.cuisines.length)]
    headline = headline.replace('{cuisine}', cuisine)
  }
  
  // Get recent reviews (randomize the selection)
  const shuffledReviews = [...reviews].sort(() => Math.random() - 0.5).slice(0, 3)
  
  // Calculate trends
  const lastMonthViews = monthlyStats[monthlyStats.length - 2].views
  const currentMonthViews = monthlyStats[monthlyStats.length - 1].views
  const viewsTrend = ((currentMonthViews - lastMonthViews) / lastMonthViews * 100).toFixed(1)
  
  return {
    rating,
    reviews: reviewCount,
    headline,
    category,
    recentReviews: shuffledReviews,
    competitors: competitorData.map(comp => ({
      ...comp,
      name: comp.name === "Local Average" ? `${location} Average` : comp.name
    })),
    monthlyStats,
    insights: {
      viewsTrend: viewsTrend > 0 ? `+${viewsTrend}%` : `${viewsTrend}%`,
      peakHours: "2 PM - 6 PM",
      popularDay: "Saturday",
      responseRate: "95%",
      responseTime: "2 hours"
    }
  }
}

export const generateNewHeadline = (name, location) => {
  const category = getBusinessCategory(name)
  const headlines = businessCategories[category].headlines
  const randomIndex = Math.floor(Math.random() * headlines.length)
  let headline = headlines[randomIndex].replace('{name}', name).replace('{location}', location)
  
  if (category === 'restaurant' && headline.includes('{cuisine}')) {
    const cuisine = businessCategories[category].cuisines[Math.floor(Math.random() * businessCategories[category].cuisines.length)]
    headline = headline.replace('{cuisine}', cuisine)
  }
  
  return headline
}