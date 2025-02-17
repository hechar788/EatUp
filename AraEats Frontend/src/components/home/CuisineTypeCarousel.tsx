import React from "react"
import '../../styles/home/CuisineTypeCarousel.css'
import { cuisineTypes } from "../../lib/constants"

// Helper function to convert cuisine type to kebab case for file naming
const toKebabCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-');
}

export default function CuisineTypeCarousel({ 
  searchParams, 
  setSearchParams 
}: {
  searchParams: URLSearchParams;
  setSearchParams: (callback: (prev: URLSearchParams) => URLSearchParams) => void;
}) {
  const [icons, setIcons] = React.useState<{[key: string]: React.ComponentType}>({});

  React.useEffect(() => {
    // Load all SVG components on mount
    cuisineTypes.forEach(async (cuisine) => {
      try {
        const module = await import(
          `../../assets/svg/cuisine-type-svg/${toKebabCase(cuisine)}-svg`
        );
        setIcons(prev => ({
          ...prev,
          [cuisine]: module.default
        }));
      } catch (error) {
        console.warn(`SVG not found for cuisine type: ${cuisine}`);
      }
    });
  }, []);

  return (
    <div className="cuisine-type-carousel">
      {cuisineTypes.map((cuisine) => {
        const IconComponent = icons[cuisine];
        const isActive = searchParams.get('category') === cuisine;

        return (
          <div
            key={cuisine}
            className={isActive ? "cuisine-type active" : "cuisine-type"}
            onClick={() => {
              setSearchParams(prev => {
                prev.set('category', isActive ? '' : cuisine)
                return prev
              })
            }}
          >
            <div className="cuisine-type-svg">
              {IconComponent ? (
                <IconComponent />
              ) : (
                <DefaultIcon />
              )}
            </div>
            <p className="cuisine-type-heading">{cuisine}</p>
          </div>
        )
      })}
    </div>
  )
}

const DefaultIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
)