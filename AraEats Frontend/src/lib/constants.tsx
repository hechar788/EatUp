import { CuisineType } from "../lib/types"

export const searchbarOptions = [
    { id: 'Name', label: 'Name: Search by Merchant Name' },
    { id: 'Rating', label: 'Rating: Search by Star Rating' },
    { id: 'Category', label: 'Category: Search by Cuisine Type' }
];

export const cuisineTypes: CuisineType[] = [
    'Offers',
    'Sandwich',
    'Mexican', 
    'Japanese',
    'Pizza',
    'Sushi',
    'Italian',
    'Burger',
    'Indian',
    'Bubble Tea',
    'Chinese',
    'Bakery',
    'Korean',
    'Vietnamese',
    'Thai',
    'Deserts'
]