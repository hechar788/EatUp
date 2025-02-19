import { useState, useEffect, RefObject } from 'react';

interface UseKeyboardNavigationProps {
  items: any[];
  onSelect: (item: any) => void;
  onClose?: () => void;
  dropdownRef: RefObject<HTMLDivElement>;
  parentRef?: RefObject<HTMLDivElement>;
  isVisible: boolean;
  activeItems?: string[];
  getItemId?: (item: any) => string;
}

export function useKeyboardNavigation({
  items,
  onSelect,
  onClose,
  dropdownRef,
  parentRef,
  isVisible,
  activeItems = [],
  getItemId = (item) => item.id || item
}: UseKeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);

  // Scroll the focused option into view
  const scrollOptionIntoView = (index: number) => {
    if (dropdownRef.current && index >= 0 && index < items.length) {
      const option = dropdownRef.current.children[index] as HTMLElement;
      if (option) {
        option.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isVisible) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setIsKeyboardNav(true);
          setFocusedIndex(prev => {
            const newIndex = prev === -1 || prev >= items.length - 1 ? 0 : prev + 1;
            scrollOptionIntoView(newIndex);
            return newIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setIsKeyboardNav(true);
          setFocusedIndex(prev => {
            const newIndex = prev <= 0 ? items.length - 1 : prev - 1;
            scrollOptionIntoView(newIndex);
            return newIndex;
          });
          break;
        case 'Enter':
          console.log('Enter key pressed, focusedIndex:', focusedIndex);
          if (focusedIndex >= 0 && focusedIndex < items.length) {
            e.preventDefault();
            console.log('Selecting item:', items[focusedIndex]);
            onSelect(items[focusedIndex]);
            setFocusedIndex(-1);
            setIsKeyboardNav(false);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setFocusedIndex(-1);
          setIsKeyboardNav(false);
          onClose?.();
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, items, isVisible, onSelect, onClose]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        (!parentRef?.current || !parentRef.current.contains(e.target as Node))
      ) {
        setFocusedIndex(-1);
        setIsKeyboardNav(false);
        onClose?.();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, parentRef]);

  // Reset index only when visibility changes from false to true
  useEffect(() => {
    if (!isVisible) {
      setFocusedIndex(-1);
      setIsKeyboardNav(false);
    }
  }, [isVisible]);

  const handleMouseEnter = (index: number) => {
    if (!isKeyboardNav) {
      setFocusedIndex(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isKeyboardNav) {
      setFocusedIndex(-1);
    }
  };
  
  return {
    focusedIndex,
    setFocusedIndex,
    isActive: (item: any) => activeItems.includes(getItemId(item)),
    handleMouseEnter,
    handleMouseLeave
  };
}