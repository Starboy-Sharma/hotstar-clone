import { useState, useEffect, useRef } from "react";

function debounce(func, delay) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function useLazyLoad() {
    const [isScrollBottom, setIsScrollBottom] = useState(false);
    const debouncedLazyLoadRef = useRef(); // Use a ref to store the debounced function

    function lazyLoadVideos() {
        // Calculate if the user has scrolled to the bottom
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('You have reached the bottom of the page!');
            setIsScrollBottom(true);

            // Reset the scroll bottom state
            setTimeout(() => {
                setIsScrollBottom(false);
            }, 500);
        }
    }

    // Initialize the debounced function only once
    useEffect(() => {
        debouncedLazyLoadRef.current = debounce(lazyLoadVideos, 500);
    }, []);

    useEffect(() => {
        const debouncedLazyLoad = debouncedLazyLoadRef.current;

        // Add an event listener for the scroll event
        window.addEventListener('scroll', debouncedLazyLoad);

        return () => {
            console.log('Removing scroll listener');
            // Remove the event listener when the component unmounts
            window.removeEventListener('scroll', debouncedLazyLoad);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    function removeScrollListener() {
        const debouncedLazyLoad = debouncedLazyLoadRef.current;

        // Remove the event listener
        window.removeEventListener('scroll', debouncedLazyLoad);
    }

    return [isScrollBottom, removeScrollListener];
}
