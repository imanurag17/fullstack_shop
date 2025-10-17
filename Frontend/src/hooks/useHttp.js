import { useState, useEffect, useCallback } from "react";

export default function useHttp(url, config = {}) {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sendingRequest = useCallback(async () => {
    if (!url) return; // prevent call if no URL

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: config.method ? config.method : "GET",
        headers: config.headers ? config.headers : {},
        body: config.body ? JSON.stringify(config.body) : null,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || "Request failed!",
          status: response.status,
          statusText: response.statusText,
        };
      }

      setFetchedData(data);
    } catch (err) {
      setError({
        message: err.message || "Something went wrong!",
        status: err.status,
        statusText: err.statusText,
      });
    } finally {
      setIsLoading(false);
    }
  }, [url, JSON.stringify(config)]); // dependencies

  useEffect(() => {
    sendingRequest();
  }, [sendingRequest]);

  return { fetchedData, error, isLoading };
}


// export default function useHttp(url) {
//   const [fetchedData, setFetchedData] = useState()
//   const [error, setError] = useState()
//   const [isLoading, setIsLoading] = useState(true)

//   async function sendingRequest() {
//     setIsLoading(true)
//     try {
//       const response = await fetch(url)
//       if (!response.ok) {
//         const error = {
//           message: 'Sending request failed',
//           status: response.status,
//           statusText: response.statusText
//         }
//         setError(error)
//         return
//       }
//       const data = await response.json()
//       setFetchedData(data)
//     } catch (error) {
//       setError({ message: error.message })
//     }
//     setIsLoading(false)
//   }
//   useEffect(() => {
//     sendingRequest()
//   }, [url])
//   return {fetchedData, error, isLoading}
// }