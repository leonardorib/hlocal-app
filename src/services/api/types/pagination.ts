export interface IPaginationRequest {
	page: number;
}

export interface IPaginationResponse<T> {
	page: number;
	pageSize: number;
	totalPages: number;
	items: T[];
}
