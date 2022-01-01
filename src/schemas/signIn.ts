import * as yup from "yup";

export const signInSchema = yup.object().shape({
	email: yup
		.string()
		.email("Email inválido")
		.max(150, "Email deve ter no máximo 150 caracteres")
		.required("Email obrigatório"),
	password: yup
		.string()
		.max(150, "Senha deve ter no máximo 150 caracteres")
		.required("Senha obrigatória"),
});
