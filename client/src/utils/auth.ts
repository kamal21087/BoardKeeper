class AuthService {
  private static TOKEN_KEY = 'jwt_token';

  // Store the token securely
  static saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Retrieve the token from localStorage
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Remove the token (logout)
  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Check if the token is valid and not expired
  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime; // Token should not be expired
    } catch (err) {
      console.error('Error validating token:', err);
      return false;
    }
  }

  // Decode the payload from the token (useful for getting user data)
  static getUserData(): Record<string, any> | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }
}

export default AuthService;
