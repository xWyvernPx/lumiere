import { Store } from '@tanstack/react-store';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  refreshToken: string | null;
}

export const authStore = new Store<AuthState>({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
});

export const authActions = {
  setUser: (user: any) => {
    authStore.setState((state) => ({ ...state, user, isAuthenticated: true }));
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    authStore.setState((state) => ({ ...state, user: null, isAuthenticated: false, token: null, refreshToken: null }));
  },
  getToken: () => authStore.state.token,
  getRefreshToken: () => authStore.state.refreshToken,
  refresh: (data: { token: string; refreshToken: string; tokenExpires?: number }) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    authStore.setState((state) => ({ ...state, token: data.token, refreshToken: data.refreshToken, isAuthenticated: true }));
  }
};

export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectUser = (state: AuthState) => state.user;
export const selectToken = (state: AuthState) => state.token;
