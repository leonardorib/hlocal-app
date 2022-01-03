import { ICompany } from "./company";
import { ILocation } from "./location";
import { IAddress } from "./address";

export interface ICreateResponsible {
	id?: string;
	name: string;
	phone: string;
	address: IAddress;
	isMainResponsible: boolean;
}

export interface IResponsible extends ICreateResponsible {
	company?: ICompany | null;
	location?: ILocation | null;

	createdDate?: Date;
	updatedDate?: Date;
}
