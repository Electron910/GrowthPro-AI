// Mock database of existing businesses
export const businessDatabase = [
  // Restaurants
  { id: 1, name: "The Gourmet Kitchen", location: "Mumbai", category: "Restaurant" },
  { id: 2, name: "The Royal Tandoor", location: "Delhi", category: "Restaurant" },
  { id: 3, name: "The Spice Garden", location: "Chennai", category: "Restaurant" },
  { id: 4, name: "The Continental Bistro", location: "Bangalore", category: "Restaurant" },
  { id: 5, name: "The Green Leaf Cafe", location: "Pune", category: "Cafe" },
  
  // Bakeries
  { id: 6, name: "Sweet Dreams Bakery", location: "Mumbai", category: "Bakery" },
  { id: 7, name: "Sugar & Spice Bakehouse", location: "Delhi", category: "Bakery" },
  { id: 8, name: "Sunrise Breads & Cakes", location: "Kolkata", category: "Bakery" },
  { id: 9, name: "Supreme Pastry Shop", location: "Hyderabad", category: "Bakery" },
  
  // Salons
  { id: 10, name: "Glamour Beauty Salon", location: "Mumbai", category: "Salon" },
  { id: 11, name: "Glow & Style Studio", location: "Delhi", category: "Salon" },
  { id: 12, name: "Grace Beauty Parlour", location: "Chennai", category: "Salon" },
  { id: 13, name: "Golden Scissors Salon", location: "Bangalore", category: "Salon" },
  
  // Gyms
  { id: 14, name: "FitLife Gym & Wellness", location: "Mumbai", category: "Gym" },
  { id: 15, name: "Fitness First Center", location: "Delhi", category: "Gym" },
  { id: 16, name: "FlexZone Fitness", location: "Pune", category: "Gym" },
  { id: 17, name: "FitPro Gymnasium", location: "Bangalore", category: "Gym" },
  
  // Cafes
  { id: 18, name: "Cafe Mocha Delight", location: "Mumbai", category: "Cafe" },
  { id: 19, name: "Coffee Culture Hub", location: "Delhi", category: "Cafe" },
  { id: 20, name: "Cozy Corner Cafe", location: "Bangalore", category: "Cafe" },
  { id: 21, name: "Caffeine & Dreams", location: "Chennai", category: "Cafe" },
  
  // Others
  { id: 22, name: "Tech Solutions Hub", location: "Mumbai", category: "Technology" },
  { id: 23, name: "Digital Marketing Pro", location: "Delhi", category: "Marketing" },
  { id: 24, name: "Design Studio Elite", location: "Bangalore", category: "Design" },
  { id: 25, name: "Data Analytics Corp", location: "Pune", category: "Technology" }
]

// Search function
export const searchBusinesses = (query, limit = 5) => {
  if (!query || query.trim().length === 0) return []
  
  const searchTerm = query.toLowerCase().trim()
  
  // Filter businesses that match the search term
  const results = businessDatabase.filter(business => 
    business.name.toLowerCase().includes(searchTerm) ||
    business.location.toLowerCase().includes(searchTerm) ||
    business.category.toLowerCase().includes(searchTerm)
  )
  
  // Sort by relevance (exact match first, then starts with, then contains)
  results.sort((a, b) => {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    
    // Exact match
    if (aName === searchTerm) return -1
    if (bName === searchTerm) return 1
    
    // Starts with
    if (aName.startsWith(searchTerm) && !bName.startsWith(searchTerm)) return -1
    if (!aName.startsWith(searchTerm) && bName.startsWith(searchTerm)) return 1
    
    // Default order
    return 0
  })
  
  return results.slice(0, limit)
}