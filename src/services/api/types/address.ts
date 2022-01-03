export interface IAddress {
	cep: string;
	state: string;
	city: string;
	street: string;
	streetNumber: number;
	neighborhood: string;
}

export type IAutoAddress = Omit<IAddress, "streetNumber">;
