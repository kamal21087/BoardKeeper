import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid username or password');
      }
      throw new Error('Login failed. Please try again later.');
    }

    const data = await response.json();
    return data.token; // Assuming the API returns a JWT token
  } catch (err) {
    console.error('Error during login:', err);
    return Promise.reject(err.message || 'An unexpected error occurred');
  }
};

export { login };
