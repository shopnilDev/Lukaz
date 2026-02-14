"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { useFilter } from "@/context/FilterContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function SearchBarWithDropdown() {
  
  const {  dispatch: dispatchFilterProduct } = useFilter();
  const [categoriesData, setCategoriesData] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [categoryId, setCategoryId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const typingTimeoutRef = useRef(null);



  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/categories`, {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategoriesData(data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSetCategory = (cat) => {
    setCategoryId(cat?.id || "");
    setCategory(cat?.name || "All");
    setIsOpen(false);
    dispatchFilterProduct({ type: "SET_CATEGORIES", payload: cat?.id || "" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatchFilterProduct({ type: "SET_SEARCH", payload: query });
    router.push(`/shop`);
  };


  // for when empty search box clear filter 
   useEffect(() => {
      if(query?.length==""){
      dispatchFilterProduct({ type: "SET_SEARCH", payload: query });
      }
  }, [query]);


 

  // Auto navigate when user stops typing
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (query.trim() !== "") {
      typingTimeoutRef.current = setTimeout(() => {
        dispatchFilterProduct({ type: "SET_SEARCH", payload: query });
        dispatchFilterProduct({ type: "SET_CATEGORIES", payload: categoryId });
        router.push("/shop");
      }, 500); // 500ms delay
    }
  }, [query, categoryId]);

  // Clear search
  const clearSearch = () => {
    setQuery("");
    dispatchFilterProduct({ type: "SET_SEARCH", payload: "" });
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 bg-white/90 rounded-md border shadow-sm
       border-gray-300 pl-4 w-full md:w-[80%] focus-within:ring-2
        focus-within:ring-[#3A9E75] transition"
    >
      {/* Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex items-center gap-1 px-1.5 py-2
           hover:text-[#3A9E75] text-sm text-gray-700 transition border-r
            border-gray-300"
        >
          {category}
          <ChevronDown className="w-4 h-4 text-gray-500 hover:text-[#3A9E75]" />
        </button>
        {isOpen && (
          <ul className="absolute z-10 top-full left-0 mt-1 w-36 bg-white border
           border-gray-200 rounded-sm shadow-lg overflow-hidden max-h-60 overflow-y-auto">
            {/* Loading State */}
            {loading && (
              <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
            )}

            {/* Default "All" Option */}
            <li
              onClick={() => handleSetCategory({ name: "All" })}
              className={`px-4 py-2 text-sm hover:bg-[#ecfdf5] hover:text-[#3A9E75] cursor-pointer transition ${
                category === "All"
                  ? "bg-[#ecfdf5] text-[#3A9E75]"
                  : "text-gray-800"
              }`}
            >
              All
            </li>

            {/* Dynamic Categories */}
            {categoriesData.map((cat, i) => (
              <li
                key={i}
                onClick={() => handleSetCategory(cat)}
                className={`px-4 py-2 text-sm hover:bg-[#ecfdf5] hover:text-[#3A9E75] cursor-pointer transition ${
                  cat?.name === category
                    ? "bg-[#ecfdf5] text-[#3A9E75]"
                    : "text-gray-800"
                }`}
              >
                {cat?.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input + Clear Button */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Button */}
      <Link
        href={`/shop`}
        className="bg-primary-green cursor-pointer text-gray-600 py-2 pr-3 
        rounded-sm hover:text-[#3A9E75] transition"
      >
        <Search className="w-5 h-5 " />
      </Link>
    </form>
  );
}
