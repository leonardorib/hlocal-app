import * as yup from "yup";

export const cepFormSchema = yup.object().shape({
	cep: yup.string().length(8, "CEP inválido").required("CEP obrigatório"),
});

export const addressFormSchema = yup.object().shape({
	streetNumber: yup
		.number()
		.typeError("Número da rua inválido")
		.positive("Número da rua deve ser positivo")
		.integer("Número da rua deve ser inteiro")
		.required("Número da rua obrigatório"),
});
