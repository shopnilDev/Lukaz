"use client"


import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Container from "@/components/shared/Container"
import axiosInstance from "@/utils/axiosInstance"
import { useFilter } from "@/context/FilterContext"
import ProductCardShopPage from "./ProductCardShopPage"
import { getColorClass } from "@/utils/getColorClass"
import ProductListSkeleton from "../Skeletons/ProductListSkeleton"
import { useParams } from "next/navigation"
import { getItemById } from "@/utils/getItemById"
import ProductCardInternational from "./ProductCardInternational"
import Pagination from "../shared/Pagination"

const allColors = ["white", "black", "red", "green",]

export default function ShopInternational({ brands, categories }) {
  const { slug } = useParams();
  const { state: filterProductState, dispatch: dispatchFilterProduct } = useFilter();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const per_page = 12; // items per page
  // State for filter values
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBrandName, setSelectedBrandName] = useState("")
  const [selectedCategoryName, setSelectedCategoryName] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [sortOrder, setSortOrder] = useState("low_to_high") // 'featured', 'lowToHigh', 'highToLow'
  // Dropdown open states
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false)
  const [isCatgoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isSizesDropdownOpen, setIsSizesDropdownOpen] = useState(false)
  const [isColorsDropdownOpen, setIsColorsDropdownOpen] = useState(false)
  const [isPriceSortDropdownOpen, setIsPriceSortDropdownOpen] = useState(false)
  // Refs for dropdowns to close on outside click
  const brandsRef = useRef(null)
  const categoryRef = useRef(null)
  const sizesRef = useRef(null)
  const colorsRef = useRef(null)
  const priceSortRef = useRef(null)

  // console.log(" filter test:", filterProductState);
  // Fetch products whenever filters change
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setSelectedColor(filterProductState?.color)
    setSelectedBrand(filterProductState?.brand)
    setSelectedCategory(filterProductState?.category)
    setSelectedBrandName(getItemById(brands, filterProductState?.brand)?.name)
    setSelectedCategoryName(getItemById(categories, filterProductState?.category)?.name)

  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      const query = new URLSearchParams();
      query.append("category_id", filterProductState?.category);
      query.append("search", filterProductState?.search);
      query.append("brand_id", filterProductState?.brand);
      query.append("color", filterProductState?.color);
      query.append("sort_by_price", filterProductState?.sort);

      // console.log("queries test:", query.toString());

      // data fetching using search params
      setLoading(true)
      const { data } = await axiosInstance.get(`/products?international=1&${query.toString()}&page=${currentPage}&per_page=${per_page}`);

      setProducts(data?.data);
      const totalPages = data?.data?.last_page
      setTotalPages(totalPages)
      setLoading(false)
    };

    fetchProducts();
  }, [currentPage, debouncedSearchTerm, selectedColor, selectedBrand, selectedCategory, filterProductState]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandsRef.current && !brandsRef.current.contains(event.target)) {
        setIsBrandsDropdownOpen(false)
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false)
      }
      if (sizesRef.current && !sizesRef.current.contains(event.target)) {
        setIsSizesDropdownOpen(false)
      }
      if (colorsRef.current && !colorsRef.current.contains(event.target)) {
        setIsColorsDropdownOpen(false)
      }
      if (priceSortRef.current && !priceSortRef.current.contains(event.target)) {
        setIsPriceSortDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handlers for filter changes (now single selection)
  const handleSearch = (search) => {
    setSearchTerm(search)
    dispatchFilterProduct({ type: "SET_SEARCH", payload: search });
  }

  const handleBrandChange = (brand) => {
    dispatchFilterProduct({ type: "SET_BRANDS", payload: brand?.id });
    setSelectedBrand((prev) => (prev === brand ? null : brand?.id))
    setSelectedBrandName(brand?.name)
    setIsBrandsDropdownOpen(false) // Close dropdown after selection
  }
  const handleCategoryChange = (cat) => {
    dispatchFilterProduct({ type: "SET_CATEGORIES", payload: cat?.id });
    setSelectedCategory((prev) => (prev === cat ? null : cat?.id))
    setSelectedCategoryName(cat?.name)
    setIsCategoryDropdownOpen(false) // Close dropdown after selection
  }
  const handleSizeChange = (size) => {

    setSelectedSize((prev) => (prev === size ? null : size))
    setIsSizesDropdownOpen(false) // Close dropdown after selection
  }
  const handleColorChange = (color) => {
    dispatchFilterProduct({ type: "SET_COLOR", payload: color });
    setSelectedColor((prev) => (prev === color ? null : color))
    setIsColorsDropdownOpen(false) // Close dropdown after selection
  }
  const handleSortByPrice = (sortby) => {
    dispatchFilterProduct({ type: "SET_SORT", payload: sortby });
    setSortOrder(sortby)
    setIsPriceSortDropdownOpen(false)
  }
  // for clear filters
  const handleFilterState = () => {
    setSearchTerm("")
    setSelectedBrand("")
    setSelectedSize("")
    setSelectedColor("")
    setSortOrder("")
    setSelectedCategory("")
    setSelectedBrandName("")
    setSelectedCategoryName("")
    dispatchFilterProduct({ type: "RESET_FILTERS" });

  }


  // console.log("product from shop page",products)

  let productListSection;
  if (loading) {

    productListSection = <ProductListSkeleton />

  }
  else {
    productListSection = products?.data?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products?.data?.map((product, i) => (
          <ProductCardInternational product={product} key={i}
          />

        ))}
      </div>
    ) : (
      <div className="text-center text-gray-600 text-lg py-10">No products found matching your criteria.</div>
    )
  }


  return (
    <Container className="py-8">
      {/* Filter Section */}
      <div className="bg-white p-3 sm:p-5 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3  xl:grid-cols-5 2xl:grid-cols-5
         gap-4  mb-6">
          {/* Search Bar */}
          <div className="">
            <label htmlFor="search" className="sr-only">
              Search Products
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name..."
              className="w-full h-10 p-2 border border-gray-300 rounded-md
                        focus:ring-2 focus:ring-[#3A9E75]
                        focus:border-[#3A9E75]
                        outline-none transition-all duration-200"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

         {/* Price Sort Dropdown */}
          <div className="relative" ref={priceSortRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md
              flex justify-between
               items-center text-gray-700 hover:bg-gray-50 focus:outline-none 
               focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent
                transition-all duration-200"
              onClick={() => setIsPriceSortDropdownOpen(!isPriceSortDropdownOpen)}
            >
              Sort by:{" "}
              {sortOrder === "low_to_high" ? "Low to High" : sortOrder === "high_to_low" ? "High to Low" : "Featured"}
              <ChevronDown className={`w-4 h-4 transition-transform ${isPriceSortDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isPriceSortDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">

                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    handleSortByPrice("low_to_high")
                  }}
                >
                  Low to High
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    handleSortByPrice("high_to_low")
                  }}
                >
                  High to Low
                </button>
              </div>
            )}
          </div>

          {/* Brands Filter Dropdown */}
          <div className="relative" ref={brandsRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center
               text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-[#3A9E75]
                focus:border-transparent transition-all duration-200"
              onClick={() => setIsBrandsDropdownOpen(!isBrandsDropdownOpen)}
            >
              Brands {selectedBrandName ? `(${selectedBrandName})` : ""}
              <ChevronDown className={`w-4 h-4 transition-transform ${isBrandsDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isBrandsDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand?.slug}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200
                      ${selectedBrand === brand?.slug
                          ? "bg-gray-800 text-white shadow-sm"
                          : "bg-[#ECF5F1] text-gray-700 hover:bg-[#e0f1e9]"
                        }
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                      onClick={() => handleBrandChange(brand)}
                    >
                      {brand?.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Categories Filter Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center
               text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-[#3A9E75]
                focus:border-transparent transition-all duration-200"
              onClick={() => setIsCategoryDropdownOpen(!isCatgoryDropdownOpen)}
            >
              {selectedCategoryName ? `Cat (${selectedCategoryName})` : "Categories"}
              <ChevronDown className={`w-4 h-4 transition-transform ${isBrandsDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isCatgoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {categories?.map((cat) => (
                    <button
                      key={cat}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200
                      ${selectedCategory === cat?.slug
                          ? "bg-gray-800 text-white shadow-sm"
                          : "bg-[#ECF5F1] text-gray-700 hover:bg-[#e0f1e9]"
                        }
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat?.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Sizes Filter Dropdown */}
          {/* <div className="relative" ref={sizesRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3A9E75]
               focus:border-transparent transition-all duration-200"
              onClick={() => setIsSizesDropdownOpen(!isSizesDropdownOpen)}
            >
              Sizes {selectedSize ? `(${selectedSize})` : ""}
              <ChevronDown className={`w-4 h-4 transition-transform ${isSizesDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isSizesDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200
                      ${
                        selectedSize === size
                          ? "bg-gray-800 text-white shadow-sm"
                          : "bg-[#ECF5F1] text-gray-700 hover:bg-[#e0f1e9]"
                      }
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div> */}

          {/* Colors Filter Dropdown */}
          <div className="relative" ref={colorsRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md 
              flex justify-between items-center
               text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-[#3A9E75] focus:border-transparent transition-all duration-200"
              onClick={() => setIsColorsDropdownOpen(!isColorsDropdownOpen)}
            >
              Colors {selectedColor ? `(${selectedColor})` : ""}
              <ChevronDown className={`w-4 h-4 transition-transform ${isColorsDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isColorsDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-3">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${getColorClass(color)} ${selectedColor === color ? "ring-2 ring-offset-2 ring-gray-800" : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-all duration-200`}
                      aria-label={`Filter by ${color} color`}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Clear Filters Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              handleFilterState()

            }}
            className="px-4 py-2 bg-[#ECF5F1] text-gray-700 rounded-md hover:bg-[#e3efea] transition-colors duration-200 focus:outline-none "
          >
            Clear Filters
          </button>
        </div>
      </div>
      {/* Product Grid */}
      {productListSection}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  )
}
