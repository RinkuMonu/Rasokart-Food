// Auth Service
import { storageService } from "./storageService";

const AUTH_KEY = "rasokart_user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const authService = {
  register(user: Omit<User, "id">): User {
    const newUser: User = { id: Date.now().toString(), ...user };
    storageService.set(AUTH_KEY, newUser);
    return newUser;
  },

  login(email: string, password: string): User | null {
    const user = storageService.get<User>(AUTH_KEY);
    if (user && user.email === email && user.password === password) {
      return user;
    }
    return null;
  },

  logout(): void {
    storageService.remove(AUTH_KEY);
  },

  getCurrentUser(): User | null {
    return storageService.get<User>(AUTH_KEY);
  },
};
