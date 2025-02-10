import React, { useState, useRef, useEffect, FormEvent } from "react";

export default function Searchbar({setSearchParams}) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);
    const [searchFilters, setSearchFilters] = useState<string[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const options = [
        { id: 'name', label: 'Name: Search by Business Name' },
        { id: 'rating', label: 'Rating: Search by Star Rating' },
        { id: 'category', label: 'Category: Search by Cuisine Type' }
    ];

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchParams(prev => {
            const newSearchParams = new URLSearchParams(prev);
            newSearchParams.set('search', searchValue);
            return newSearchParams;
        });
    }

    function handleDropdownClosure(e: MouseEvent) {
        if (
            inputRef.current &&
            dropdownRef.current &&
            !inputRef.current.contains(e.target as Node) &&
            !dropdownRef.current.contains(e.target as Node)
        ) {
            setSearchDropdownVisible(false);
            setFocusedIndex(-1);
        }
    };

    const toggleFilter = (filterId: string) => {
        setSearchFilters((prevFilters) => {
            const isRemoving = prevFilters.includes(filterId);
            const newFilters = isRemoving 
                ? prevFilters.filter((item) => item !== filterId)
                : [...prevFilters, filterId];
                
            // Only close dropdown if we're adding a new filter
            if (!isRemoving) {
                setSearchDropdownVisible(false);
                setFocusedIndex(-1);
            }
            
            return newFilters;
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!searchDropdownVisible) return;
    
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => {
                    if (prev === -1 || prev >= options.length - 1) return 0;
                    return prev + 1;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => {
                    if (prev <= 0) return options.length - 1;
                    return prev - 1;
                });
                break;
            case 'Enter':
                // Only prevent default and handle dropdown selection if an option is focused
                if (focusedIndex >= 0 && focusedIndex < options.length) {
                    e.preventDefault();
                    toggleFilter(options[focusedIndex].id);
                }
                break;
            case 'Escape':
                setSearchDropdownVisible(false);
                setFocusedIndex(-1);
                break;
        }
    };

    useEffect(() => {
        if (searchDropdownVisible) {
            document.addEventListener("mousedown", handleDropdownClosure);
            document.addEventListener("keydown", handleKeyDown as unknown as EventListener);
        } else {
            document.removeEventListener("mousedown", handleDropdownClosure);
            document.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
        }
        return () => {
            document.removeEventListener("mousedown", handleDropdownClosure);
            document.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
        };
    }, [searchDropdownVisible, focusedIndex]);

    const scrollOptionIntoView = (index: number) => {
        if (dropdownRef.current && index >= 0) {
            const option = dropdownRef.current.children[index] as HTMLElement;
            if (option) {
                option.scrollIntoView({ block: 'nearest' });
            }
        }
    };

    useEffect(() => {
        scrollOptionIntoView(focusedIndex);
    }, [focusedIndex]);

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <form onSubmit={(e) => handleFormSubmission(e)}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={'Search here...'}
                    value={searchValue}
                    onChange={e=>setSearchValue(e.target.value)}
                    onClick={() => setSearchDropdownVisible(!searchDropdownVisible)}
                />
                {searchDropdownVisible && (
                    <div 
                        className='searchbar-dropdown' 
                        ref={dropdownRef}
                        onMouseLeave={() => setFocusedIndex(-1)}
                    >
                        {options.map((option, index) => (
                            <div 
                                key={option.id}
                                className={`
                                    ${searchFilters.includes(option.id) ? 'active' : ''}
                                    ${focusedIndex === index ? 'focused' : ''}
                                `}
                                onClick={() => toggleFilter(option.id)}
                                onMouseEnter={() => setFocusedIndex(index)}
                            >
                                <p>{option.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}