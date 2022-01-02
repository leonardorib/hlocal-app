import { IResponsible } from "./responsible";
import { IUser } from "./user";

export interface ICompany {
	id: string;
	name: string;
	cnpj: string;
	description: string;

	responsibles: IResponsible[];

	user?: IUser;
}

export interface ICreateCompany {
	name: string;
	cnpj: string;
	description: string;
	responsibles: IResponsible[];
}

export interface IUpdateCompany {
	companyId: string;
	companyData: ICreateCompany;
}
