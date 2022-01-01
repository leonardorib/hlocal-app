import constants from "../../constants";
import { IUser } from "../api";

export class StorageService {
	getToken() {
		return localStorage.getItem(constants.tokenKey);
	}

	public setToken = (token: string): void => {
		localStorage.setItem(constants.tokenKey, token);
	};

	public removeToken = (): void => {
		localStorage.removeItem(constants.tokenKey);
	};

	public getUser = (): IUser | null => {
		const userJson = localStorage.getItem(constants.currentUserKey);
		if (!userJson) return null;
		const user = JSON.parse(userJson);
		return user;
	};

	public setUser = (user: IUser): void => {
		const userString = JSON.stringify(user);
		localStorage.setItem(constants.currentUserKey, userString);
	};

	public removeUser = (): void => {
		localStorage.removeItem(constants.currentUserKey);
	};
}
