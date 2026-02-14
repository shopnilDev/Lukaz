export default function FeaturedCategoriesList() {
  const menProducts = [
    {
      id: 1,
      category: "Casual Wear",
      defaultImage: "/images/shoe/2.jpg",
      hoverImage: "/images/shoe/10.jpg",
    },
    {
      id: 2,
      category: "Formal Wear",
      defaultImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      category: "Sports Wear",
      defaultImage: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Men's Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Men's Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

    
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="group relative w-full h-96 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Default Image */}
        <img
          src={product.defaultImage || "/placeholder.svg"}
          alt={product.category}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
        />

        {/* Hover Image with Circle Animation */}
        <img
          src={product.hoverImage || "/placeholder.svg"}
          alt={`${product.category} model`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:rounded-full group-hover:scale-75 group-hover:border-8 group-hover:border-white"
        />
      </div>

      {/* Buttons Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Main Category Button */}
        <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-500 ease-in-out transform group-hover:-translate-y-12 hover:bg-gray-100">
          {product.category}
        </button>

        {/* Additional Buttons Container */}
        <div className="flex flex-col items-center space-y-3 mt-4 transition-all duration-500 ease-in-out transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          {/* For Men Button */}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105">
            For Men
          </button>

          {/* For Women Button */}
          <button className="bg-pink-600 text-white px-5 py-2 rounded-full font-medium shadow-lg transition-all duration-300 ease-in-out hover:bg-pink-700 hover:scale-105">
            For Women
          </button>
        </div>
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-20 transition-all duration-500 ease-in-out group-hover:bg-opacity-40"></div>
    </div>
  )
}
