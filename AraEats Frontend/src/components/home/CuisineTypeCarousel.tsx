import React, { useState } from "react"
import '../../styles/home/CuisineTypeCarousel.css'

export default function CuisineTypeCarousel() {
    const [activeCuisineType, setActiveCuisineType] = useState<string>();
    let cuisineTypes = [
        'Bakery',
        'Deserts',
        'Mexican',
        'Chinese',
        'Japanese',
    ]

    return (
        <div className="cuisine-type-carousel">
            {cuisineTypes.map((cuisine) => {
                return (
                <div
                className={activeCuisineType == cuisine ? "cuisine-type active" : "cuisine-type"}
                onClick={() => {
                    if (activeCuisineType != cuisine) {
                        setActiveCuisineType(cuisine)
                    } else {
                        setActiveCuisineType('')
                    }
                }}
            >
                <p className="cuisine-type-svg">picture</p>
                <p className="cuisine-type-heading">{cuisine}</p>
            </div>
            )
            })
            }
        </div>
    )
}