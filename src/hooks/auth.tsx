import React, { createContext, useState, useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";
import { AxiosResponse } from "axios";
import { api, IUser, ILogin } from "../services/api";
import { StorageService } from "../services/storage";

interface AuthContextData {
	user: IUser | null;
	token: string | null;
	isInitialCheckLoading: boolean;
	login(signInData: ILogin, onSuccess?: () => void): Promise<void>;
	logout(): void;
	updateLocalUser(user: IUser): Promise<void>;
}

interface AuthProviderState {
	user: IUser | null;
	token: string | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const storageService = new StorageService();
	const [isInitialCheckLoading, setIsInitialCheckLoading] = useState(false);
	const [authState, setAuthState] = useState<AuthProviderState>({
		user: null,
		token: null,
	});

	const updateLocalUser = async (user: IUser) => {
		storageService.setUser(user);
		setAuthState({ ...authState, user });
	};

	const login = async (loginData: ILogin, onSuccess?: () => void) => {
		const { user, access_token: token } = await api.authenticate(loginData);
		storageService.setUser(user);
		storageService.setToken(token);

		setAuthState({
			user,
			token,
		});
		if (onSuccess) onSuccess();
	};

	const logout = async () => {
		setAuthState({
			user: null,
			token: null,
		});
		storageService.removeToken();
		storageService.removeUser();
	};

	const isTokenExpired = (token: string): boolean => {
		const decodedToken: any = jwtDecode(token);
		const expirationDateSeconds = decodedToken.exp;
		const nowSeconds = Date.now() / 1000;
		const isExpired = !(
			expirationDateSeconds && expirationDateSeconds > nowSeconds
		);
		return isExpired;
	};

	const logoutIfTokenExpired = async (token: string) => {
		if (isTokenExpired(token)) {
			await logout();
		}
	};

	useEffect(() => {
		const loadStorageData = async () => {
			setIsInitialCheckLoading(true);
			try {
				const storedUser = storageService.getUser();
				const storedToken = storageService.getToken();
				const isSaved = storedUser && storedToken;

				if (!isSaved) return;

				setAuthState({
					user: storedUser,
					token: storedToken,
				});
				api.setToken(storedToken);

				const onResponseFulfilled = (response: AxiosResponse<any>) => {
					return response;
				};
				const onResponseRejected = async (error: any) => {
					if (error.response.status === (401 || 403)) {
						await logoutIfTokenExpired(storedToken);
					}

					return Promise.reject(error);
				};

				api.client.interceptors.response.use(
					onResponseFulfilled,
					onResponseRejected
				);
			} catch (e) {
				console.error(e);
			} finally {
				setIsInitialCheckLoading(false);
			}
		};

		loadStorageData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isInitialCheckLoading,
				user: authState.user,
				token: authState.token,
				login,
				logout,
				updateLocalUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	return context;
}
