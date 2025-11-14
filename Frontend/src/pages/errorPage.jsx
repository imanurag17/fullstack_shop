// errorPage.jsx
import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  // safe defaults
  let status = error?.status || error?.statusCode || 500;
  let statusText = error?.statusText || "";
  let message = "Something went wrong.";

  // error.data can be a string, an object, or undefined
  if (error?.data) {
    if (typeof error.data === "string") {
      // sometimes error.data is a JSON string
      try {
        const parsed = JSON.parse(error.data);
        message = parsed?.message || error.data;
      } catch {
        // not JSON — use as-is
        message = error.data;
      }
    } else if (typeof error.data === "object") {
      // already parsed
      message = error.data.message || JSON.stringify(error.data);
    }
  } else if (error?.message) {
    // normal thrown Error
    message = error.message;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Error {status}</h1>
      {statusText && <h3>{statusText}</h3>}
      <p>{message}</p>
    </div>
  );
}
