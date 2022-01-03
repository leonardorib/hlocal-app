export { default as api } from "./client";
export * from "./types";

export function treatErrorMessage(e: any, alternativeMessage?: string): string {
	return (
		e.response?.data?.message ||
		e.message ||
		alternativeMessage ||
		"Erro. Tente novamente."
	);
}
