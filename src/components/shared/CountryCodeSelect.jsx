"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CountryCodeSelect({ countries = [], value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Ensure array always valid
  const list = Array.isArray(countries) ? countries : [];

  // Filter logic (safe with numbers)
  const filtered = list.filter((c) => {
    const name = (c?.name || "").toLowerCase();
    const short = (c?.sortname || "").toLowerCase();
    const codeStr = String(c?.phonecode || "");

    const q = search.toLowerCase();

    return (
      name.includes(q) ||
      short.includes(q) ||
      codeStr.includes(q)
    );
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Find selected country
  const selected = list.find(
    (c) => String(c.phonecode) === String(value)
  );

  return (
    <div className="relative w-32" ref={containerRef}>
      {/* Selected Box */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full px-2 py-2 border border-gray-300 rounded-sm bg-white text-sm flex justify-between items-center"
      >
        {selected ? (
          <span>
            {selected.sortname} (+{selected.phonecode})
          </span>
        ) : (
          <span className="text-gray-400">Code</span>
        )}
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          
          {/* Search input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search country/code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>

          {/* Country list */}
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  onChange(String(c.phonecode)); // always return string
                  setIsOpen(false);
                  setSearch("");
                }}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex justify-between"
              >
                <span>
                   {c.sortname} 
                  {/* {c.sortname} — {c.name} */}
                </span>
                <span className="text-gray-500">+{c.phonecode}</span>
              </div>
            ))
          ) : (
            <div className="py-3 text-center text-sm text-gray-400">
              No results
            </div>
          )}
        </div>
      )}
    </div>
  );
}
