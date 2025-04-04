/**
 * API Service for making HTTP requests to the backend
 * Uses the native fetch API instead of axios
 */

const API_BASE_URL = '/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiService {
  /**
   * Make a request to the API
   */
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // Add params to URL if provided
    let url = `${API_BASE_URL}${endpoint}`;
    if (options.params) {
      const queryParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      url += `?${queryParams.toString()}`;
    }

    // Add authorization header if token exists
    // Check for both regular token and admin token
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    const headers = new Headers(options.headers || {});
    
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
    }
    
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    // Make the request
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Handle 401 Unauthorized (token expired)
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login if needed
        // window.location.href = '/';
        throw new Error('Unauthorized - Please log in again');
      }

      // Handle other error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      // Parse and return the response data
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const options: RequestOptions = {
      method: 'POST'
    };

    if (data instanceof FormData) {
      options.body = data;
    } else if (data) {
      options.body = JSON.stringify(data);
    }

    return this.request<T>(endpoint, options);
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const options: RequestOptions = {
      method: 'PUT'
    };

    if (data instanceof FormData) {
      options.body = data;
    } else if (data) {
      options.body = JSON.stringify(data);
    }

    return this.request<T>(endpoint, options);
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const options: RequestOptions = {
      method: 'PATCH'
    };

    if (data instanceof FormData) {
      options.body = data;
    } else if (data) {
      options.body = JSON.stringify(data);
    }

    return this.request<T>(endpoint, options);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create and export a singleton instance
const api = new ApiService();
export default api;
