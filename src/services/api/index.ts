export function setupApiClient(ctx?: string) {
  async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const baseUrl = "https://catalogsapi.vercel.app";

    const defaultHeaders: Record<string, string> = {
      ...(ctx ? { Authorization: `Bearer ${ctx}` } : {}),
    };

    // Não sobrescreve headers quando o corpo é FormData
    const isFormData = options.body instanceof FormData;
    const finalHeaders = isFormData ? defaultHeaders : {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };

    const defaultOptions: RequestInit = {
      headers: finalHeaders,
      ...options,
    };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, defaultOptions);

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  }

  return {
    get: (endpoint: string, options: RequestInit = {}) =>
      apiFetch(endpoint, { method: "GET", ...options }),
    post: (endpoint: string, body: any) =>
      apiFetch(endpoint, {
        method: "POST",
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
    put: (endpoint: string, body: any) =>
      apiFetch(endpoint, {
        method: "PUT",
        body: body instanceof FormData ? body : JSON.stringify(body),
      }),
    delete: (endpoint: string) => apiFetch(endpoint, { method: "DELETE" }),
  };
}
