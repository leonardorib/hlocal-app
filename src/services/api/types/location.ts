import { ICompany } from "./company";
import { IResponsible, ICreateResponsible } from "./responsible";
import { IAddress } from "./address";

export interface ILocation {
	id: string;
	name: string;
	address: IAddress;

	responsibles: IResponsible[];

	company?: ICompany;
}

export interface ICreateLocation {
	companyId: string;
	name: string;
	addressCep: string;
	addressNumber: number;
	responsibles: ICreateResponsible[];
}

export interface IUpdateLocation {
	locationId: string;
	locationData: Omit<ICreateLocation, "companyId">;
}

export interface IGetLocationByCompany {
	companyId: string;
	page: number;
}
