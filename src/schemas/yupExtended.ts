import * as yup from "yup";
import { isPhoneNumber } from "class-validator";
import { AnyObject, Maybe } from "yup/lib/types";
import { cnpj } from "cpf-cnpj-validator";

function isValidPhone(this: yup.StringSchema, errorMessage: string) {
	return this.test({
		name: "phone",
		message: errorMessage,
		test: (value) => {
			return value && isPhoneNumber(value, "BR") ? true : false;
		},
	});
}

function isValidCnpj(this: yup.StringSchema, errorMessage: string) {
	return this.test({
		name: "cnpj",
		message: errorMessage,
		test: (value) => {
			return value && cnpj.isValid(value) ? true : false;
		},
	});
}

yup.addMethod<yup.StringSchema>(yup.string, "phone", isValidPhone);
yup.addMethod<yup.StringSchema>(yup.string, "cnpj", isValidCnpj);

declare module "yup" {
	interface StringSchema<
		TType extends Maybe<string> = string | undefined,
		TContext extends AnyObject = AnyObject,
		TOut extends TType = TType
	> extends yup.BaseSchema<TType, TContext, TOut> {
		phone(errorMessage: string): StringSchema<TType, TContext>;
		cnpj(errorMessage: string): StringSchema<TType, TContext>;
	}
}

export default yup;
