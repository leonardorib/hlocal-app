import { IAddress } from "../../types";
const cepPromise = require("cep-promise");

export async function getAddressFromCep(
	cep: string
): Promise<Omit<IAddress, "streetNumber">> {
	return cepPromise(cep, {});
}

export function formatAddress(addressFields: IAddress): string {
	const { cep, state, city, street, neighborhood, streetNumber } =
		addressFields;

	return `${street}, ${streetNumber}. ${neighborhood}. ${city}, ${state}. ${cep}`;
}
