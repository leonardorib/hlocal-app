import axios, { AxiosInstance } from "axios";
import {
	IUser,
	ILogin,
	ILoginResponse,
	ICreateUser,
	IUpdateUser,
} from "./types";
import constants from "../../constants";
import { StorageService } from "../storage";

class ApiClient {
	public client: AxiosInstance;
	private storage: StorageService;

	constructor(storageService: StorageService) {
		this.storage = storageService;
		const API_URL =
			constants.environment === "development"
				? "http://localhost:4000"
				: "http://localhost:4000";

		this.client = axios.create({
			baseURL: API_URL,
		});
	}

	public setToken = (token: string) => {
		this.storage.setToken(token);
		this.client.defaults.headers.common = {
			Authorization: `Bearer ${token}`,
		};
	};

	public authenticate = async (body: ILogin) => {
		const { data } = await this.client.post<ILoginResponse>(
			"/auth/login",
			body
		);
		this.setToken(data.access_token);
		return data;
	};

	public users = {
		getById: async (userId: string) => {
			const { data } = await this.client.get<IUser>(`/user/${userId}`);
			return data;
		},
		create: async (body: ICreateUser) => {
			const { data } = await this.client.post<IUser>("/user", body);
			return data;
		},
		update: async (args: IUpdateUser) => {
			const { userId, userData } = args;
			const { data } = await this.client.put<IUser>(
				`/user/${userId}`,
				userData
			);
			return data;
		},
	};
}

const storageService = new StorageService();
export default new ApiClient(storageService);
