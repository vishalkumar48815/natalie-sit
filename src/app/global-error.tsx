"use client";

import { useEffect } from "react";

/** Last-resort boundary (root layout failed). Must render its own <html>/<body>. */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(135deg,#f6f3ff,#ece6ff)",
          color: "#15123d",
        }}
      >
        <title>Something went wrong · Natalie Sit</title>
        <div style={{ textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Something went wrong.</h1>
          <p style={{ color: "#4a4670", marginBottom: 24 }}>Please refresh the page or try again in a moment.</p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              border: 0,
              borderRadius: 999,
              padding: "12px 28px",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              background: "linear-gradient(95deg,#2f4cf6,#7b3cf2,#c86af0)",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
