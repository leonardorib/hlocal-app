import { ICompany } from "./company";
import { ILocation } from "./location";

export interface IResponsible {
	id?: string;
	name: string;
	phone: string;

	addressFormatted: string;
	addressCep: string;

	isMainResponsible: boolean;

	company?: ICompany | null;
	location?: ILocation | null;

	createdDate?: Date;
	updatedDate?: Date;
}
