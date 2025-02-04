import React from "react"
import '../../styles/home/CuisineTypeCarousel.css'

export default function CuisineTypeCarousel({ searchParams, setSearchParams }) {
    let cuisineTypes = [
        'Bakery',
        'Deserts',
        'Mexican',
        'Chinese',
        'Japanese',
        'Pizza'

    ]

    return (
        <div className="cuisine-type-carousel">
            {cuisineTypes.map((cuisine) => {
                return (
                <div
                key={cuisine}
                className={searchParams.get('category') == cuisine ? "cuisine-type active" : "cuisine-type"}
                onClick={() => {
                    if (searchParams.get('category') != cuisine) {
                        setSearchParams(prev=> {
                            prev.set('category', cuisine)
                            return prev
                        })
                    } else {
                        setSearchParams(prev=> {
                            prev.set('category', '')
                            return prev
                        })                    }
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