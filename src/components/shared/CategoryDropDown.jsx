"use client"
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function CategoryDropDown() {
    const [selectedCategory, setSelectedCategory] = useState(null);

const demoMenuItems = ["Men's", "Women's", "Kids", "Accessories", "Sports", "Brands"]
    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={demoMenuItems} optionLabel="name" 
                placeholder="Category" className="w-full md:w-14rem " />
        </div>
    )
}
        