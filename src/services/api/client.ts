import axios, { AxiosInstance } from "axios";
import {
	IUser,
	ILogin,
	ILoginResponse,
	ICreateUser,
	IUpdateUser,
	ICompany,
	ICreateCompany,
	IUpdateCompany,
	IPaginationResponse,
	ICreateLocation,
	ILocation,
	IUpdateLocation,
	IGetLocationByCompany,
} from "./types/index";
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
				: "https://api.hlocal.leonardoribeiro.com";

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
			const { data } = await this.client.get<IUser>(`/users/${userId}`);
			return data;
		},
		create: async (body: ICreateUser) => {
			const { data } = await this.client.post<IUser>("/users", body);
			return data;
		},
		update: async (args: IUpdateUser) => {
			const { userId, userData } = args;
			const { data } = await this.client.put<IUser>(
				`/users/${userId}`,
				userData
			);
			return data;
		},
	};

	public companies = {
		getById: async (id: string) => {
			const { data } = await this.client.get<ICompany>(
				`/companies/${id}`
			);
			return data;
		},
		create: async (body: ICreateCompany) => {
			const { data } = await this.client.post<ICompany>(
				"/companies",
				body
			);
			return data;
		},
		update: async (args: IUpdateCompany) => {
			const { companyId, companyData } = args;
			const { data } = await this.client.put<ICompany>(
				`/companies/${companyId}`,
				companyData
			);
			return data;
		},
		delete: async (id: string) => {
			const { data } = await this.client.delete<ICompany>(
				`/companies/${id}`
			);
			return data;
		},
		getAllByCurrentUser: async (page: number) => {
			const { data } = await this.client.get<
				IPaginationResponse<ICompany>
			>("/companies", { params: { page } });
			return data;
		},
	};

	public locations = {
		getById: async (id: string) => {
			const { data } = await this.client.get<ILocation>(
				`/companies/locations/${id}`
			);
			return data;
		},
		create: async (body: ICreateLocation) => {
			const { companyId, ...rest } = body;
			const { data } = await this.client.post<ILocation>(
				`/companies/${companyId}/locations`,
				rest
			);
			return data;
		},
		update: async (args: IUpdateLocation) => {
			const { locationId, locationData } = args;
			const { data } = await this.client.put<ILocation>(
				`/companies/locations/${locationId}`,
				locationData
			);
			return data;
		},
		delete: async (id: string) => {
			const { data } = await this.client.delete<ILocation>(
				`/companies/locations/${id}`
			);
			return data;
		},
		getAllByCompany: async (args: IGetLocationByCompany) => {
			const { companyId, page } = args;
			const { data } = await this.client.get<
				IPaginationResponse<ILocation>
			>(`/companies/${companyId}/locations`, { params: { page } });
			return data;
		},
	};
}

const storageService = new StorageService();
export default new ApiClient(storageService);
