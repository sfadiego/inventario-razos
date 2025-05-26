import { axiosApi } from '@/configs/axiosConfig';
import { IUser } from '@/models/user.interface';
import { createContext, useCallback, useEffect, useState } from 'react';
import { IAuthContextType } from './interfaces/IAuthContextType';
import { IAuthProviderProps } from './interfaces/IAuthProviderProps';

export const AxiosContext = createContext<IAuthContextType | undefined>(undefined);

export const AxiosProvider = ({ children }: IAuthProviderProps) => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [user, setUser] = useState<IUser | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);
    const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);

    const logout = useCallback(() => {
        configureAxiosHeaders(null);
        configUser(null);
        window.location.replace('/login');
    }, []);

    useEffect(() => {
        const responseInterceptor = axiosApi.interceptors.response.use(
            (response) => {
                if (response.status === 200 && response.config.responseType != 'blob') {
                    response.data = response.data.data;
                }
                return response;
            },
            (error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosApi.interceptors.response.eject(responseInterceptor);
        };
    }, [logout]);

    useEffect(() => {
        if (authToken) {
            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        }
    }, [authToken]);

    const updateUser = useCallback((user: IUser) => {
        configUser(user);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!isFetchingUser && authToken && user) {
                setIsFetchingUser(true);
                try {
                    const response: IUser = {
                        id: 1,
                        name: 'diego armando',
                        email: 'email@gmail.com',
                        role_id: 1,
                        activo: true,
                        created_at: '2025-03-20',
                        updated_at: '2025-03-20',
                    };
                    updateUser(response);
                } catch (error) {
                    console.error('Error fetching user profile', error);
                }
            }
        };

        fetchUser();
    }, [authToken, isFetchingUser, updateUser, user]);

    const configureAxiosHeaders = (token: string | null) => {
        if (token) {
            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authToken', token);
        } else {
            delete axiosApi.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
        }
        setAuthToken(token);
    };

    const configUser = (user: IUser | null) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        setUser(user);
    };

    const saveAuth = (accessToken: string, user: IUser) => {
        try {
            configureAxiosHeaders(accessToken);
            configUser(user);
        } catch (error) {
            console.error('Error de autenticación', error);
            throw error;
        }
    };

    const isAuth = !!authToken;

    const value = {
        authToken,
        user,
        isAuth,
        saveAuth,
        updateUser,
        logout,
        axiosApi,
    };

    return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
};
