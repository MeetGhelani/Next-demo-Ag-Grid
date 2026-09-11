import { ApiResponse } from "@/types/api";

// Cached working base URL to prevent redundant retries after initial discovery
let cachedWorkingBaseUrl: string | null = null;

/**
 * Gets candidate base URLs to try depending on environment context.
 */
function getCandidateBaseUrls(): string[] {
  if (typeof window !== "undefined") {
    const { hostname, port, protocol } = window.location;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const host = isLocalhost ? "localhost" : hostname;

    // From .env.local if provided
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    const envConfiguredUrl = envUrl
      ? envUrl.replace("localhost", host).replace("127.0.0.1", host)
      : null;

    // Dev mode (Next.js dev server on port 3000)
    if (port === "3000") {
      return Array.from(
        new Set(
          [
            `${protocol}//${host}:5144/api`,
            `${protocol}//${host}:8081/api`,
            envConfiguredUrl,
          ].filter(Boolean) as string[]
        )
      );
    }

    // IIS Hosted mode (e.g. port 8080, 80, 443)
    return Array.from(
      new Set(
        [
          `${protocol}//${host}:8081/api`,
          `${protocol}//${host}:5144/api`,
          envConfiguredUrl,
        ].filter(Boolean) as string[]
      )
    );
  }

  return [process.env.NEXT_PUBLIC_API_URL || "http://localhost:5144/api"];
}

export class ApiError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export async function apiFetch<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const candidateUrls = cachedWorkingBaseUrl
    ? [cachedWorkingBaseUrl, ...getCandidateBaseUrls().filter((u) => u !== cachedWorkingBaseUrl)]
    : getCandidateBaseUrls();

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  let lastError: Error | null = null;

  for (const baseUrl of candidateUrls) {
    const url = `${baseUrl}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options?.headers,
        },
        cache: options?.cache || "no-store",
      });

      let json: any;
      try {
        json = await response.json();
      } catch (err) {
        if (!response.ok) {
          throw new ApiError(
            `API call to ${endpoint} failed with HTTP status ${response.status}`,
            response.status
          );
        }
        json = {} as T;
      }

      if (!response.ok) {
        const errorMessage =
          json?.message || `API request failed with status code ${response.status}`;
        throw new ApiError(errorMessage, response.status, json?.errors);
      }

      // Save working URL on success for all future requests
      cachedWorkingBaseUrl = baseUrl;
      return json as T;
    } catch (err: any) {
      lastError = err;
      // If it's an ApiError returned by the server (HTTP 4xx/5xx), don't failover to next port
      if (err instanceof ApiError) {
        throw err;
      }
      // If network fetch failed (connection refused/CORS), try next candidate URL
    }
  }

  throw lastError || new Error(`Could not connect to API server at ${candidateUrls.join(", ")}`);
}
