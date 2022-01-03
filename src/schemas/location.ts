import yup from "./yupExtended";

export const createLocationSchema = yup.object().shape({
	name: yup.string().required("Nome do local obrigatório"),
	streetNumber: yup
		.number()
		.typeError("Número do endereço inválido")
		.integer("Número do endereço deve ser inteiro")
		.positive("Número do endereço deve ser positivo")
		.required("Número do endereço obrigatório"),
});
