import yup from "./yupExtended";

export const companySchema = yup.object().shape({
	name: yup.string().required("Nome obrigatório"),
	description: yup.string().required("Descrição obrigatória"),
	cnpj: yup.string().cnpj("CNPJ inválido").required("CNPJ obrigatório"),
});
