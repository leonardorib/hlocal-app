import React from "react";
import { ICreateResponsible } from "../services/api";

export const useResponsibles = (initialResponsibles?: ICreateResponsible[]) => {
	const [responsibles, setResponsibles] = React.useState<
		ICreateResponsible[]
	>(initialResponsibles || []);
	return { responsibles, setResponsibles };
};
