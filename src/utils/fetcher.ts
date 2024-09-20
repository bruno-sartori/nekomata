type FetchConfig = {
  withAuth: boolean;
};

class Fetcher {
  private static async fetch(url: string, init: RequestInit) {
    const apiUrl: string = 'http://localhost:3000';
    console.log(init);
    const response = await fetch(`${apiUrl}${url}`, init);
    return response.json();
  }

  public static async get<T>(url: string, config?: FetchConfig): Promise<T> {
    const init: RequestInit = {
      method: 'GET',
    };

    if (config?.withAuth) {
      const token = localStorage.getItem('token');
      init.headers = {
        ...init.headers,
        'Authorization': `Bearer ${token}` 
      };
    }

    return Fetcher.fetch(url, init);
  }

  public static async post<T>(url: string, payload: any, config?: FetchConfig): Promise<T> {
    const init: RequestInit = {
      method: 'POST', 
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (config?.withAuth) {
      const token = localStorage.getItem('token');
      init.headers = {
        ...init.headers,
        Authorization: `Bearer ${token}` 
      };
    }

    return Fetcher.fetch(url, init);
  }
}

export default Fetcher;
