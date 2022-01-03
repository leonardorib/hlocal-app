import React from "react";
import { IAddress } from "../services/api";

const emptyAddress: Omit<IAddress, "streetNumber"> = {
	cep: "",
	city: "",
	neighborhood: "",
	state: "",
	street: "",
};

export const useAddress = (initialAddress?: IAddress) => {
	const [address, setAddress] = React.useState(
		initialAddress || emptyAddress
	);
	return { address, setAddress };
};
