import * as yup from "yup";

export const signUpSchema = yup.object().shape({
	name: yup
		.string()
		.min(3, "Nome deve ter no mínimo 3 caracteres")
		.max(50, "Nome deve ter no máximo 50 caracteres")
		.required("Nome obrigatório"),
	email: yup
		.string()
		.email("Email inválido")
		.max(150, "Email deve ter no máximo 150 caracteres")
		.required("Email obrigatório"),
	password: yup
		.string()
		.min(5, "A senha deve ter no mínimo 5 caracteres")
		.max(150, "Senha deve ter no máximo 150 caracteres")
		.required("Senha obrigatória"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Deve ser igual à senha")
		.required("Confirmação de senha obrigatória"),
});
