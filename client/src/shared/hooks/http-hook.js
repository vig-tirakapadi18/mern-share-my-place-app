import {
    useCallback,
    // useEffect, useRef,
    useState
} from "react";

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setIsLoading(true);

        // const httpAbortControl = new AbortController();
        // activeHttpRequests.current.push(httpAbortControl);

        try {
            // const response = await fetch(url, { method, headers, body, signal: httpAbortControl.signal });
            const response = await fetch(url, { method, headers, body });
            const responseData = await response.json();

            // activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortControl);

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            throw error;
        }
    }, []);

    const clearError = () => setError(null);

    // useEffect(() => {
    //     return () => {
    //         activeHttpRequests.current.forEach(abortControl => abortControl.abort());
    //     }
    // }, []);

    return { isLoading, error, sendRequest, clearError };
};