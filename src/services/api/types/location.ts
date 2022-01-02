import { ICompany } from "./company";
import { IResponsible } from "./responsible";

export interface ILocation {
	id: string;
	name: string;
	addressFormatted: string;
	addressCep: string;

	responsibles: IResponsible[];

	company?: ICompany;
}

export interface ICreateLocation {
	companyId: string;
	name: string;
	addressCep: string;
	addressNumber: number;
	responsibles: IResponsible[];
}

export interface IUpdateLocation {
	locationId: string;
	locationData: Omit<ICreateLocation, "companyId">;
}

export interface IGetLocationByCompany {
	companyId: string;
	page: number;
}
