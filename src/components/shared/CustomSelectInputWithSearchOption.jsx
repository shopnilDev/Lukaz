"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelectInputWithSearchOption({
  options = [],
  selectedItem,
  handleFunction,
  label
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Normalize options: support array of strings or array of objects
  const normalized = Array.isArray(options) ? options : [];

  const q = (search || "").toString().toLowerCase();

  const filteredOptions = normalized.filter((c) => {
    // if item is a string (e.g. ["Bangladesh","India"])
    if (typeof c === "string") {
      return c.toLowerCase().includes(q);
    }

    // otherwise treat as object (country object)
    const name = (c?.name ?? "").toString().toLowerCase();
    const sort = (c?.sortname ?? "").toString().toLowerCase();
    const code = (c?.phonecode ?? "").toString().toLowerCase();

    return name.includes(q) || sort.includes(q) || code.includes(q);
  });

  const handleSelect = (option) => {
    handleFunction(option);
    setIsOpen(false);
    setSearch("");
  };

  // Helper to render selected text (works for string or object)
  const renderSelected = () => {
    if (!selectedItem) return `Select a ${label}`;

    if (typeof selectedItem === "string") return selectedItem;

    // assume object
    return selectedItem?.sortname
      ? `${selectedItem.sortname} (+${selectedItem.phonecode})`
      : selectedItem?.name ?? `Select a ${label}`;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Main Button */}
      <div
        className="bg-white border border-gray-300 rounded-sm px-3 py-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm text-gray-700">{renderSelected()}</span>
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-lg max-h-72 overflow-y-auto">

          {/* Search Bar */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search by name`}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              autoFocus
            />
          </div>

          {/* Options */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length ? (
              filteredOptions.map((option, idx) => {
                const key = typeof option === "string" ? option + idx : option.id ?? idx;
                const labelText =
                  typeof option === "string"
                    ? option
                    : `${option.sortname ?? ""} — ${option.name ?? ""}`;
                const rightText = typeof option === "string" ? "" : `+${option.phonecode ?? ""}`;

                return (
                  <li
                    key={key}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-[#3A9E75] hover:text-white flex justify-between"
                  >
                    <span className="truncate">{labelText}</span>
                    <span className="ml-2 text-gray-200">{rightText}</span>
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500 text-center">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
