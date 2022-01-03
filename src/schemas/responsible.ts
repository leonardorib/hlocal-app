import yup from "./yupExtended";

export const createResponsibleSchema = yup.object().shape({
	name: yup.string().required("Nome do responsável obrigatório"),
	phone: yup
		.string()
		.required("Telefone do responsável obrigatório")
		.phone("Telefone inválido"),
	streetNumber: yup
		.number()
		.typeError("Número do endereço inválido")
		.integer("Número do endereço deve ser inteiro")
		.positive("Número do endereço deve ser positivo")
		.required("Número do endereço obrigatório"),
});
