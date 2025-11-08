import axios from "axios";

export const api = axios.create({
    // Use a relative base URL so the Vite dev proxy (configured in vite.config.js)
    // forwards requests to the backend and avoids CORS during development.
    baseURL: "/api/v1",
    withCredentials: true,
    auth: {
        username: "admin",
        password: "admin123",
    },
});

export function parseError(error){
    // log the raw error to the console for debugging
    // callers should still display a user-friendly message
    console.error("API error:", error);

    if (error?.response) {
        const { status, data } = error.response;
        if (data?.details) {
            return Object.entries(data.details)
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n");
        }
        if (data?.error) return `(${status}) ${data.error}`;

        // fallback: stringify response body if possible
        try {
            const str = typeof data === "string" ? data : JSON.stringify(data);
            return `(${status}) ${str}`;
        } catch (e) {
            return `(${status}) Unexpected response format`;
        }
    }

    if (error?.request) {
        // request was made but no response received
        return "No response received from server. Possible network/CORS issue or server is down.";
    }

    return error?.message || "Unknown error occurred";
}