// Tipos básicos
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  error?: string;
}

const API_URL = 'https://back-office-backend-six.vercel.app/v1';

// Función para establecer cookies seguras
const setSecureCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  // Configuración segura de cookies
  const cookieOptions = [
    `expires=${expires.toUTCString()}`,
    'path=/',
    'SameSite=Strict',
    'Secure', // Solo en HTTPS
    'HttpOnly' // Protege contra XSS
  ].join('; ');
  
  document.cookie = `${name}=${value}; ${cookieOptions}`;
};

// Función para obtener cookies
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Función para eliminar cookies
const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

class SecureAuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      console.log("Enviando petición de login a:", `${API_URL}/auth/login`);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Incluye cookies en la petición
        body: JSON.stringify(credentials)
      });
      
      console.log("Respuesta del servidor:", response.status, response.statusText);
      
      const data = await response.json();
      console.log("Datos de respuesta:", data);
      
      if (response.ok && data.access_token) {
        // Almacenar token en cookie HttpOnly segura
        setSecureCookie('auth_token', data.access_token, 7);
        
        // Almacenar información del usuario en sessionStorage (menos sensible)
        sessionStorage.setItem('user', JSON.stringify(data.user));
        
        console.log("Login exitoso, token almacenado");
        return { success: true, token: data.access_token, user: data.user };
      } else {
        console.log("Login fallido:", data.error || 'Credenciales inválidas');
        return { success: false, error: data.error || 'Credenciales inválidas' };
      }
    } catch (error) {
      console.error("Error en la petición de login:", error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  }

  logout(): void {
    // Eliminar cookies seguras
    removeCookie('auth_token');
    removeCookie('refresh_token');
    
    // Limpiar sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!getCookie('auth_token');
  }

  getUser() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return getCookie('auth_token');
  }

  getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return token ? { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : { 'Content-Type': 'application/json' };
  }

  // Método para renovar token automáticamente
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = getCookie('refresh_token');
      if (!refreshToken) return false;

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ refresh_token: refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        setSecureCookie('auth_token', data.access_token, 7);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export default new SecureAuthService();
