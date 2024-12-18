import { useEffect, useState } from "react";

export function useFetch({ url, options = {} }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const accessKey = import.meta.env.VITE_TMDB_ACCESS_KEY;

    // Combine headers safely without mutating the input options
    const headers = {
        accept: "application/json",
        Authorization: `Bearer ${accessKey}`,
        ...options.headers,
    };

    useEffect(() => {
        if (!url) {
            setLoading(false);
            setError("No URL provided.");
            return;
        }

        const controller = new AbortController(); // For request cancellation
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    ...options,
                    headers,
                    signal: controller.signal, // Attach abort signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setData(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to cancel ongoing fetch
        return () => controller.abort();
    }, [url, JSON.stringify(options)]); // Dependency array includes stringified options to detect changes

    return { loading, data, error };
}
