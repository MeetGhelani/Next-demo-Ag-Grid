/**
 * Gets candidate base URLs for dual ASP.NET Core endpoints (port 5144 and 8081).
 */

// Cached working base URL to prevent redundant retries after initial discovery
let cachedWorkingBaseUrl: string | null = null;

function getCandidateBaseUrls(): string[] {
  if (typeof window !== "undefined") {
    const { hostname, port, protocol } = window.location;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const host = isLocalhost ? "localhost" : hostname;

    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    const envConfiguredUrl = envUrl
      ? envUrl.replace("localhost", host).replace("127.0.0.1", host)
      : null;

    const candidatePorts = port === "3000" ? ["5144", "8081"] : ["8081", "5144"];

    // Dual active ports: 5144 and 8081
    return Array.from(
      new Set(
        [
          ...candidatePorts.map((p) => `${protocol}//${host}:${p}/api`),
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

export async function apiFetch<T = unknown>(
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

      let json: unknown;
      try {
        json = await response.json();
      } catch {
        if (!response.ok) {
          throw new ApiError(
            `API call to ${endpoint} failed with HTTP status ${response.status}`,
            response.status
          );
        }
        json = {} as T;
      }

      const responseObj = json as { message?: string; errors?: string[] } | null;

      if (!response.ok) {
        const errorMessage =
          responseObj?.message || `API request failed with status code ${response.status}`;
        throw new ApiError(errorMessage, response.status, responseObj?.errors);
      }

      // Save working URL on success for all future requests
      cachedWorkingBaseUrl = baseUrl;
      return json as T;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      // If server returned explicit HTTP error status (4xx/5xx), do not retry next port
      if (err instanceof ApiError) {
        throw err;
      }
      // If network connection failed (e.g. port not listening), failover to next candidate port
    }
  }

  throw lastError || new Error(`Could not connect to API server at ${candidateUrls.join(", ")}`);
}
